package services

import (
"github.com/slickqa/slick/slickqa"
	"golang.org/x/net/context"
	"google.golang.org/grpc/codes"
	"github.com/slickqa/slick/jwtauth"
	"google.golang.org/grpc/status"
	"github.com/slickqa/slick/db"
)



type SlickCompanyService struct {}

func (*SlickCompanyService) AddCompanySettings(ctx context.Context, req *slickqa.CompanySettingsRequest) (*slickqa.CompanySettings, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	if ! claims.IsCompanyAdmin(req.CompanyName) && claims.Permissions.SlickAdmin == 0 {
		return nil, status.Error(codes.PermissionDenied, "User is not company admin")
	}
	settings := db.EmptyCompanySettingsFor(req.CompanyName)
	err = db.CompanySettings.AddCompanySettings(settings)
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	return settings, nil
}

func (*SlickCompanyService) GetAvailableCompanySettings(ctx context.Context, req *slickqa.AvailableCompanySettingsRequest) (*slickqa.AvailableCompanySettings, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	var settings []*slickqa.CompanySettings
	if claims.Permissions.SlickAdmin != 0 {
		settings, err = db.CompanySettings.FindAll()
	} else {
		companyNames := make([]string, 0, len(claims.Permissions.Companies))
		for k := range claims.Permissions.Companies {
			companyNames = append(companyNames, k)
		}
		settings, err = db.CompanySettings.FindAllIn(companyNames...)
	}
	if err != nil {
		settings = make([]*slickqa.CompanySettings, 0)
	}
	return &slickqa.AvailableCompanySettings{
		Companies: settings,
	}, nil
}

func (*SlickCompanyService) GetCompanySettings(ctx context.Context, req *slickqa.CompanySettingsRequest) (*slickqa.CompanySettings, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	if ! claims.HasReadPermissionForCompany(req.CompanyName) {
		return nil, status.Error(codes.PermissionDenied, "User does not have permission to company")
	}
	retval, err := db.CompanySettings.Find(req.CompanyName)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}
	return retval, nil
}

func (*SlickCompanyService) UpdateCompanySettings(ctx context.Context, req *slickqa.CompanySettings) (*slickqa.CompanySettings, error) {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	if ! claims.IsCompanyAdmin(req.CompanyName) {
		return nil, status.Error(codes.PermissionDenied, "User is not company admin")
	}
	err = db.CompanySettings.UpdateCompanySettings(req.CompanyName, req)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}
	return req, nil
}



