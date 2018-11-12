package db

import (
	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
)

const (
	LinksCollectionName = "links"
)

type linksType struct {}
var Links = linksType{}

type LinksQuery struct {
	Company string `bson:"_id.company"`
	Project string `bson:"_id.project"`
	EntityType string `bson:"_id.type"`
	EntityId string `bson:"_id.id"`
}

func (l *linksType) FindLinkById(id *slickqa.LinkIdentity) (*slickqa.Link, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	var retval slickqa.Link
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(LinksCollectionName).FindId(id).One(&retval)
	return &retval, err
}

func (l *linksType) FindLinks(query *LinksQuery) ([]*slickqa.Link, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	return l.FindLinksUsingConnection(query, mongo)
}

func (*linksType) FindLinksUsingConnection(query *LinksQuery, mongo *mgo.Session) ([]*slickqa.Link, error) {
	var links []*slickqa.Link
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(LinksCollectionName).Find(query).All(&links)
	return links, err
}

func (*linksType) AddLink(link *slickqa.Link) (error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(LinksCollectionName).Insert(link)
	return err
}

func (*linksType) DeleteLink(id *slickqa.LinkIdentity) (error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(LinksCollectionName).RemoveId(id)
	return err
}

func (*linksType) UpdateLink(link *slickqa.Link) (error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(LinksCollectionName).Update(bson.M{"_id": link.Id}, link)
	return err
}