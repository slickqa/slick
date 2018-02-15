package services

import (
	"github.com/slickqa/slick/slickqa"
	"golang.org/x/net/context"
	"github.com/slickqa/slick/jwtauth"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"github.com/slickqa/slick/db"
)

type SlickUsersService struct {}

func (SlickUsersService) GetCurrentUserInfo(ctx context.Context, req *slickqa.CurrentUserRequest) (*slickqa.UserInfo, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	user, err := db.User.Find(claims.Subject)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	return user, nil

}

func (SlickUsersService) GetUserInfo(context.Context, *slickqa.UserInfoRequest) (*slickqa.UserInfo, error) {
	panic("implement me")
}

func (SlickUsersService) GetUsersForCompany(context.Context, *slickqa.UsersForCompanyQueryRequest) (*slickqa.UsersQueryResponse, error) {
	panic("implement me")
}

func (SlickUsersService) GetUsersForProject(context.Context, *slickqa.UsersForProjectQueryRequest) (*slickqa.UsersQueryResponse, error) {
	panic("implement me")
}



