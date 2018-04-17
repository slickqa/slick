package services

import (
	"github.com/slickqa/slick/slickqa"
	"golang.org/x/net/context"
)

type SlickLinksService struct {
}

func (SlickLinksService) GetLinkList(context.Context, *slickqa.LinkListIdentity) (*slickqa.LinkList, error) {
	panic("implement me")
}

func (SlickLinksService) AddLinkToList(context.Context, *slickqa.LinkRequest) (*slickqa.LinkList, error) {
	panic("implement me")
}

func (SlickLinksService) RemoveLink(context.Context, *slickqa.RemoveLinkRequest) (*slickqa.LinkList, error) {
	panic("implement me")
}

func (SlickLinksService) UpdateLink(context.Context, *slickqa.LinkRequest) (*slickqa.LinkList, error) {
	panic("implement me")
}



