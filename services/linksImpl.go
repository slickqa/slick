package services

import (
	"context"
	"errors"
	"fmt"
	"github.com/golang/protobuf/ptypes"
	"github.com/minio/minio-go"
	"github.com/rs/zerolog/log"
	"github.com/slickqa/slick/db"
	"github.com/slickqa/slick/jwtauth"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)

type SlickLinksService struct {
}

func linkPermissionFromEntityType(entityType string) (uint32) {
	switch entityType {
	case "Company":
		return slickconfig.PERMISSION_ADMIN
	case "Project":
		return slickconfig.PERMISSION_ADMIN
	case "Testcase":
		return slickconfig.PERMISSION_TESTCASE_WRITE
	case "Build":
		return slickconfig.PERMISSION_BUILD_WRITE
	case "Testplan":
		return slickconfig.PERMISSION_TESTPLAN_WRITE
	case "Testrun":
		return slickconfig.PERMISSION_TESTRUN_WRITE
	case "Result":
		return slickconfig.PERMISSION_RESULT_WRITE
	case "Agent":
		return slickconfig.PERMISSION_RESULT_WRITE
	default:
		return 0xfffffff // an unreasonable permission, not all the bits are even used
	}
}

func validateLinkId(id *slickqa.LinkIdentity) error {
	if id == nil {
		return fmt.Errorf("invalid link id")
	}

	if id.Company == "" {
		return fmt.Errorf("invalid link id, company is empty")
	}

	if id.Project == "" {
		return fmt.Errorf("invalid link id, project is empty")
	}

	if id.EntityType == "" {
		return fmt.Errorf("invalid link id, entity type is empty")
	}

	if id.EntityType != "Project" &&
	   id.EntityType != "Testcase" &&
	   id.EntityType != "Build" &&
	   id.EntityType != "Testplan" &&
	   id.EntityType != "Testrun" &&
	   id.EntityType != "Result" &&
	   id.EntityType != "Agent" &&
	   id.EntityType != "Company" {
	   	return fmt.Errorf("link identity type %s is invalid", id.EntityType)
	}

	if id.EntityId == "" {
		return fmt.Errorf("invlid link id, entity id is empty")
	}

	if id.Name == "" {
		return fmt.Errorf("invlid link id, name is empty")
	}

	return nil
}

func listIdentityFromLinkIdentity(identity *slickqa.LinkIdentity) (*slickqa.LinkListIdentity) {
	if identity == nil {
		return nil
	}
	return &slickqa.LinkListIdentity{
		Company: identity.Company,
		Project: identity.Project,
		EntityType: identity.EntityType,
		EntityId: identity.EntityId,
	}
}

func sanitizeLinkObject(target *slickqa.Link, original *slickqa.Link) {
	if target == nil {
		return
	}
	if original != nil {
		target.Creator = original.Creator
		target.FileInfo = original.FileInfo
	} else {
		// the only thing allowed to set file info is the upload process
		target.FileInfo = nil
	}
	target.Updated = ptypes.TimestampNow()
}

func checkLinkForErrors(target *slickqa.Link) (error) {
	if target == nil {
		return errors.New("invalid link object")
	}
	if target.Id == nil {
		return errors.New("missing id")
	}
	if target.Id.Name == "" {
		return errors.New("empty name is invalid")
	}
	if target.Id.Company == "" {
		return errors.New("empty company is invalid")
	}
	if target.Id.Project == "" {
		return errors.New("empty product is invalid")
	}
	if target.Id.EntityType == "" {
		return errors.New("empty entity type is invalid")
	}
	if target.Type == "" {
		return errors.New("empty target type is invalid")
	}
	return nil
}

func (SlickLinksService) GetLinks(ctx context.Context, id *slickqa.LinkListIdentity) (*slickqa.LinkList, error) {
	err := jwtauth.HasPermission(ctx, id.Company, id.Project, 0)

	if err != nil {
		if id.EntityType == "Company" && id.Project == "-" && id.EntityId == "-" {
			claims, err := jwtauth.GetClaimsFromContext(ctx)
			if err != nil {
				return nil, status.Error(codes.PermissionDenied, err.Error())
			}

			// if they are looking for company links they need a minimum of read only access to at least one project in
			// the company
			company, ok := claims.Permissions.Companies[id.Company]
			if !(ok && id.EntityType == "Company" && len(company.ProjectPermissions) > 0) {
				return nil, status.Error(codes.PermissionDenied, fmt.Sprintf("User %s does not have read only permissions to Company %s", claims.Id, id.Project))
			}
		} else {
			return nil, status.Error(codes.PermissionDenied, err.Error())
		}
	}

	links, err := db.Links.FindLinks(&db.LinksQuery{ Company: id.Company, Project: id.Project, EntityType: id.EntityType, EntityId: id.EntityId})
	return &slickqa.LinkList{
		Links: links,
	}, err
}

func (l SlickLinksService) AddLink(ctx context.Context, link *slickqa.Link) (*slickqa.LinkList, error) {
	err := checkLinkForErrors(link)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	claims, err := jwtauth.GetClaimsCheckPermission(ctx, link.Id.Company, link.Id.Project, linkPermissionFromEntityType(link.Id.EntityType))
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}

	err = validateLinkId(link.Id)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	// make sure they aren't editing protected entries of the link object
	sanitizeLinkObject(link, nil)

	// set Creator
	link.Creator = claims.Subject

	// save link
	err = db.Links.AddLink(link)
	if err != nil {
		return nil, status.Error(codes.AlreadyExists, err.Error())
	}

	//db.Links.
	return l.GetLinks(ctx, listIdentityFromLinkIdentity(link.Id))
}

func (l SlickLinksService) RemoveLink(ctx context.Context, id *slickqa.LinkIdentity) (*slickqa.LinkList, error) {
	err := jwtauth.HasPermission(ctx, id.Company, id.Project, linkPermissionFromEntityType(id.EntityType))
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}

	link, err := db.Links.FindLinkById(id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}
	if link.FileInfo != nil {
		compSettings, err := db.CompanySettings.Find(id.Company)
		if err != nil || compSettings.StorageSettings == nil || compSettings.StorageSettings.AccessKey == "" {
			// TODO: log error, don't fail, this can happen if someone removes storage options, we should still allow removing the link from the db
		} else {
			// TODO: remove file from storage
		}
	}

	// delete link object from db
	err = db.Links.DeleteLink(id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}
	return l.GetLinks(ctx, listIdentityFromLinkIdentity(id))
}

func (l SlickLinksService) UpdateLink(ctx context.Context, link *slickqa.Link) (*slickqa.LinkList, error) {
	err := jwtauth.HasPermission(ctx, link.Id.Company, link.Id.Project, linkPermissionFromEntityType(link.Id.EntityType))
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	// find link in db, return error if it doesn't exist
	original, err := db.Links.FindLinkById(link.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	// make sure they aren't editing protected entries of the link object
	sanitizeLinkObject(link, original)

	// save link
	err = db.Links.UpdateLink(link)
	if err != nil {
		// shouldn't be possible
		return nil, status.Error(codes.NotFound, err.Error())
	}

	// return list
	return l.GetLinks(ctx, listIdentityFromLinkIdentity(link.Id))
}

func (l SlickLinksService) GetDownloadUrl(ctx context.Context, id *slickqa.LinkIdentity) (*slickqa.LinkUrl, error) {
	err := jwtauth.HasPermission(ctx, id.Company, id.Project, 0)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}


	logger := log.With().Str("loggerName", "services.linksImpl.GetDownloadUrl").Logger()
	logger.Debug().Msgf("Looking for link %+v", id)
	// find link in db, return error if it doesn't exist
	link, err := db.Links.FindLinkById(id)
	if err != nil {
		logger.Debug().Str("error", err.Error()).Msg("Error finding link")
		return nil, status.Error(codes.NotFound, err.Error())
	}

	if link.FileInfo == nil {
		return nil, status.Error(codes.InvalidArgument, "link has no file information")
	}

	// get company settings for s3 configuration
	settings, err := db.CompanySettings.Find(id.Company)
	if err != nil || settings.StorageSettings == nil {
		return nil, status.Error(codes.InvalidArgument, fmt.Sprintf("No storage settings are defined for %s", id.Company))
	}

	logger.Debug().Str("BaseUrl", settings.StorageSettings.BaseUrl).Msg("Initializing minio client")
	// generate URL from company storage settings
	minioClient, err := minio.New(settings.StorageSettings.BaseUrl, settings.StorageSettings.AccessKey, settings.StorageSettings.SecretKey, true)
	if err != nil {
		logger.Error().Str("error", err.Error()).Msg("Unable to create storage client")
		return nil, status.Error(codes.Unknown, "Unable to create storage client")
	}

	// TODO come up with a more intelligent time period or at least configurable, maybe tied to jwt expiration?
	url, err := minioClient.PresignedGetObject(settings.StorageSettings.Bucket, link.FileInfo.Path, time.Minute * 15, nil)
	if err != nil {
		return nil, status.Error(codes.Unknown, "Generating url failed.")
	}
	logger.Debug().Str("URL", url.String())

	expire, _ := ptypes.TimestampProto(time.Now().Add(time.Minute * 15))

	return &slickqa.LinkUrl{Url: url.String(), Expires: expire}, nil
}

func (l SlickLinksService) GetUploadUrl(ctx context.Context, uploadInfo *slickqa.FileUploadInfo) (*slickqa.LinkUrl, error) {
	logger := log.With().Str("loggerName", "services.linksImpl.GetUploadUrl").Logger()
	err := jwtauth.HasPermission(ctx, uploadInfo.Id.Company, uploadInfo.Id.Project, linkPermissionFromEntityType(uploadInfo.Id.EntityType))
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	err = validateLinkId(uploadInfo.Id)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	if uploadInfo.ContentType == "" {
		return nil, status.Error(codes.InvalidArgument, "Must supply a content type")
	}

	if uploadInfo.FileName == "" {
		return nil, status.Error(codes.InvalidArgument, "Must have a non empty filename")
	}

	// find link in db, return error if it doesn't exist
	link, err := db.Links.FindLinkById(uploadInfo.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	if link.Type != "File" {
		return nil, status.Error(codes.InvalidArgument, "only links with a type of 'File' can get an upload url")
	}

	// get company settings for s3 configuration before we update the link
	settings, err := db.CompanySettings.Find(uploadInfo.Id.Company)
	if err != nil || settings.StorageSettings == nil {
		return nil, status.Error(codes.InvalidArgument, fmt.Sprintf("No storage settings are defined for %s", uploadInfo.Id.Company))
	}

	// update db with current file upload info
	prefix := ""
	if settings.StorageSettings.Prefix != "" {
		prefix = settings.StorageSettings.Prefix
	}
	link.FileInfo = &slickqa.SlickFile{
		FileName: uploadInfo.FileName,
		ContentType: uploadInfo.ContentType,
		Path: prefix + uploadInfo.Id.EntityType + "/" + uploadInfo.Id.EntityId + "/" + uploadInfo.FileName,
		Size: uploadInfo.Size,
	}

	err = db.Links.UpdateLink(link)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "Unable to update link: %s", err.Error())
	}

	logger.Debug().Str("BaseUrl", settings.StorageSettings.BaseUrl).Msg("Initializing minio client")
	// generate URL from company storage settings
	minioClient, err := minio.New(settings.StorageSettings.BaseUrl, settings.StorageSettings.AccessKey, settings.StorageSettings.SecretKey, true)
	if err != nil {
		logger.Error().Str("error", err.Error()).Msg("Unable to create storage client")
		return nil, status.Error(codes.Unknown, "Unable to create storage client")
	}

	// generate upload URL from company storage settings locked to file upload info
	// TODO come up with a more intelligent time period or at least configurable, maybe tied to jwt expiration?
	url, err := minioClient.PresignedPutObject(settings.StorageSettings.Bucket, link.FileInfo.Path, time.Minute * 15)
	logger.Debug().Str("URL", url.String()).Msg("Generated upload url")

	expire, _ := ptypes.TimestampProto(time.Now().Add(time.Minute * 15))
	return &slickqa.LinkUrl{Url: url.String(), Expires: expire}, nil
}



