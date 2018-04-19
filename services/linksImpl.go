package services

import (
	"github.com/slickqa/slick/slickqa"
	"golang.org/x/net/context"
)

type SlickLinksService struct {
}

func (SlickLinksService) GetLinks(context.Context, *slickqa.LinkListIdentity) (*slickqa.LinkList, error) {
	panic("implement me")
}

func (SlickLinksService) AddLink(context.Context, *slickqa.Link) (*slickqa.LinkList, error) {
	panic("implement me")
}

func (SlickLinksService) RemoveLink(context.Context, *slickqa.LinkIdentity) (*slickqa.LinkList, error) {
	panic("implement me")
}

func (SlickLinksService) UpdateLink(context.Context, *slickqa.Link) (*slickqa.LinkList, error) {
	panic("implement me")
}

func (SlickLinksService) CreateFileInfo(context.Context, *slickqa.LinkIdentity) (*slickqa.Link, error) {
	panic("implement me")
}

func (SlickLinksService) GetDownloadUrl(context.Context, *slickqa.LinkIdentity) (*slickqa.LinkUrl, error) {
	panic("implement me")
}

func (SlickLinksService) GetUploadUrl(context.Context, *slickqa.FileUploadInfo) (*slickqa.LinkUrl, error) {
	panic("implement me")
}



