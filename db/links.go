package db

import "github.com/slickqa/slick/slickqa"

const (
	LinksCollectionName = "links"
)

type linksType struct {}
var Links = linksType{}

type LinksQuery struct {
	ID *slickqa.LinkIdentity `bson:"_id"`
}

func (*linksType) findLinks()  {

}

