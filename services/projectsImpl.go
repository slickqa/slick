package services

import (
	"github.com/slickqa/slick/slickqa"
	"context"
	"github.com/slickqa/slick/jwtauth"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"github.com/slickqa/slick/db"
)

type SlickProjectsService struct {}

func (SlickProjectsService) AddProject(ctx context.Context, id *slickqa.ProjectIdentity) (*slickqa.Project, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	company, ok := claims.Permissions.Companies[id.Company]
	if (!ok || company.CompanyAdmin == 0) && claims.Permissions.SlickAdmin == 0 {
		return nil, status.Error(codes.PermissionDenied, "not company admin or slick admin")
	}

	project, err := db.Projects.AddProject(*id)
	return project, err
}

func (SlickProjectsService) GetProjects(ctx context.Context, req *slickqa.ProjectsRequest) (*slickqa.ProjectsListResponse, error) {
	retval := slickqa.ProjectsListResponse{}
	var err error
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	if claims.Permissions.SlickAdmin != 0 {
		retval.Projects, err = db.Projects.GetAllProjects("")
		return &retval, err
	}
	retval.Projects = make([]*slickqa.Project, 0)
	idList := make([]*slickqa.ProjectIdentity, 0)
	for companyName, companyPermissions := range claims.Permissions.Companies {
		if companyPermissions.CompanyAdmin != 0 {
			projectListTemp, err := db.Projects.GetAllProjects(companyName)
			if err != nil {
				break
			}
			retval.Projects = append(retval.Projects, projectListTemp...)
		} else {
			for projectName := range companyPermissions.ProjectPermissions {
				idList = append(idList, &slickqa.ProjectIdentity{Company:companyName, Name: projectName})
			}
		}
	}
	if len(idList) > 0 {
		projectListTemp, err := db.Projects.GetProjectsFromList(idList)
		if err == nil {
			retval.Projects = append(retval.Projects, projectListTemp...)
		}
	}

	return &retval, err
}

func (SlickProjectsService) GetProjectByName(ctx context.Context, id *slickqa.ProjectIdentity) (*slickqa.Project, error) {
	err := jwtauth.HasPermission(ctx, id.Company, id.Name, 0)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	project, err := db.Projects.GetProject(id.Company, id.Name)
	return project, err
}



