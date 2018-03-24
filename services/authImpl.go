package services

import (
	"golang.org/x/net/context"
	"github.com/slickqa/slick/jwtauth"
	"github.com/slickqa/slick/slickqa"
	"github.com/slickqa/slick/slickconfig"
	"errors"
	"github.com/slickqa/slick/db"
)


type SlickAuthService struct {}

func failedLoginResponse() (*slickqa.LoginResponse, error) {
	return &slickqa.LoginResponse{
		Success: false,
		Token: "",
		User: nil,
	}, nil
}

func (s *SlickAuthService) RefreshToken(ctx context.Context, request *slickqa.RefreshTokenRequest) (*slickqa.LoginResponse, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return failedLoginResponse()
	} else {
		user, err := db.User.Find(claims.Subject)
		if err != nil {
			return failedLoginResponse()
		}
		token, err :=  jwtauth.CreateJWTForUser(*user)
		if err != nil {
			return failedLoginResponse()
		}
		return &slickqa.LoginResponse{
			Success: true,
			Token: token,
			User: user,
		}, nil
	}
}

func (s *SlickAuthService) LoginWithToken(context.Context, *slickqa.ApiTokenLoginRequest) (*slickqa.LoginResponse, error) {
	return nil, errors.New("not implemented")
}

func (s *SlickAuthService) LoginWithCredentials(context.Context, *slickqa.PlainUserLoginRequest) (*slickqa.LoginResponse, error) {
	return nil, errors.New("not implemented")
}

func (s *SlickAuthService) IsAuthorized(ctx context.Context, req *slickqa.IsAuthorizedRequest) (*slickqa.IsAuthorizedResponse, error) {
	err := jwtauth.HasPermission(ctx, req.CompanyName, req.ProjectName, req.Permission)
	if err != nil {
		return &slickqa.IsAuthorizedResponse{
			Allowed: false,
			Message: err.Error(),
		}, nil
	} else {
		return &slickqa.IsAuthorizedResponse{
			Allowed: true,
			Message: "User is authorized for " + slickconfig.DescribePermission(req.Permission),
		}, nil
	}
}


