package services

import (
	"github.com/rs/zerolog/log"
	"github.com/slickqa/slick/slickqa"
	"context"
	"github.com/slickqa/slick/jwtauth"
	"google.golang.org/grpc/status"
	"google.golang.org/grpc/codes"
	"github.com/slickqa/slick/db"
	"github.com/slickqa/slick/slickconfig"
	"github.com/golang/protobuf/ptypes"
	"errors"
	"fmt"
	"github.com/minio/minio-go"
	"time"
)

type SlickLinksService struct {
}

func linkPermissionFromEntityType(entityType string) (uint32) {
	switch entityType {
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
	default:
		return 0xfffffff // an unreasonable permission, not all the bits are even used
	}
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
		return nil, status.Error(codes.PermissionDenied, err.Error())
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
	logger.Debug().Msg("Looking for link")
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
	err := jwtauth.HasPermission(ctx, uploadInfo.Id.Company, uploadInfo.Id.Project, linkPermissionFromEntityType(uploadInfo.Id.EntityType))
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	// find link in db, return error if it doesn't exist
	// update db with current file upload info
	// generate upload URL from company storage settings locked to file upload info

	panic("implement me")
}



