package services

import (
	"github.com/slickqa/slick/slickqa"
	"golang.org/x/net/context"
	"github.com/slickqa/slick/slickversion"
)

type SlickVersionService struct {}

func (SlickVersionService) GetFullVersion(context.Context, *slickqa.VersionRequest) (*slickqa.VersionInfoResponse, error) {
	return &slickqa.VersionInfoResponse{Version: slickversion.GetVersion()}, nil
}



