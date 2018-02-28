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

func (SlickUsersService) AddUserToCompany(ctx context.Context, req *slickqa.AddUserRequest) (*slickqa.UserInfo, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	if claims.Permissions.SlickAdmin == 0 && !claims.IsCompanyAdmin(req.CompanyName) {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	if req.CompanyName != req.Permissions.CompanyName {
		return nil, status.Error(codes.PermissionDenied, "Two different companies used in request")
	}
	user, err := db.User.Find(req.UserEmail)
	if err != nil {
		user = &slickqa.UserInfo{
			EmailAddress: req.UserEmail,
			Permissions: &slickqa.SlickPermissionInfo{
				Companies: []*slickqa.CompanyPermissionInfo {
					req.Permissions,
				},
			},
		}
		db.User.AddUser(user)
		return user, nil
	} else {
		if user.Permissions.Companies == nil {
			user.Permissions.Companies = []*slickqa.CompanyPermissionInfo{}
		}
		for _, company := range user.Permissions.Companies {
			if company.CompanyName == req.CompanyName {
				return nil, status.Error(codes.InvalidArgument, "User already belongs to company")
			}
		}
		user.Permissions.Companies = append(user.Permissions.Companies, req.Permissions)
		db.User.UpdateUser(user)
		return user, nil
	}
}

func (SlickUsersService) UpdateUser(ctx context.Context, req *slickqa.UserInfo) (*slickqa.UserInfo, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	user, err := db.User.Find(req.EmailAddress)
	if err != nil {
		// it's important to do a permission denied if we can't find a user.
		// It stops people from trying to find out valid user account names by brute force
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	if claims.Subject != req.EmailAddress {
		admin := claims.Permissions.SlickAdmin != 0
		if ! admin {
			for _, company := range user.Permissions.Companies {
				if claims.IsCompanyAdmin(company.CompanyName) {
					admin = true
					break
				}
			}
		}
		if ! admin {
			return nil, status.Error(codes.PermissionDenied, err.Error())
		}
	}

	// this method will not allow updating of permissions, that will have to be a different call
	user.AvatarUrl = req.AvatarUrl
	user.FamilyName = req.FamilyName
	user.GivenName = req.GivenName
	user.FullName = req.FullName
	user.UserPreferences = req.UserPreferences
	user.JobTitle = req.JobTitle
	db.User.UpdateUser(user)
	return user, nil
}

func (SlickUsersService) GetCurrentUserInfo(ctx context.Context, req *slickqa.CurrentUserRequest) (*slickqa.UserInfo, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	user, err := db.User.Find(claims.Subject)
	if err != nil {
		// it's important to do a permission denied if we can't find a user.
		// It stops people from trying to find out valid user account names by brute force
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	return user, nil

}

func (SlickUsersService) GetUserInfo(ctx context.Context, req *slickqa.UserInfoRequest) (*slickqa.UserInfo, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	user, err := db.User.Find(claims.Subject)
	if err != nil {
		// it's important to do a permission denied if we can't find a user.
		// It stops people from trying to find out valid user account names by brute force
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	// now we need to find out if:
	// 1. they are slick admin
	// 2. they are a company admin of a company the user being fetched has access to
	// 3. they have at least one project in common
	// if not: PermissionDenied
	return user, nil
}

func (SlickUsersService) GetUsersForCompany(context.Context, *slickqa.UsersForCompanyQueryRequest) (*slickqa.UsersQueryResponse, error) {
	panic("implement me")
}

func (SlickUsersService) GetUsersForProject(context.Context, *slickqa.UsersForProjectQueryRequest) (*slickqa.UsersQueryResponse, error) {
	panic("implement me")
}



