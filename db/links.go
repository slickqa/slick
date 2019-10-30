package db

import (
	"context"
	"fmt"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
	"go.mongodb.org/mongo-driver/bson"
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
	var retval slickqa.Link
	findResult := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(LinksCollectionName).FindOne(context.TODO(), bson.M{"_id": id})
	if findResult == nil || findResult.Err() != nil {
		return nil, fmt.Errorf("link with id %+v not found", id)
	}
	err := findResult.Decode(&retval)
	return &retval, err
}

func (l *linksType) FindLinks(query *LinksQuery) ([]*slickqa.Link, error) {
	var links []*slickqa.Link
	cursor, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(LinksCollectionName).Find(context.TODO(), query)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	err = cursor.All(context.TODO(), &links)
	return links, err
}

func (*linksType) AddLink(link *slickqa.Link) error {
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(LinksCollectionName).InsertOne(context.TODO(), link)
	return err
}

func (*linksType) DeleteLink(id *slickqa.LinkIdentity) error {
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(LinksCollectionName).DeleteOne(context.TODO(), bson.M{"_id": id})
	return err
}

func (*linksType) UpdateLink(link *slickqa.Link) error {
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(LinksCollectionName).ReplaceOne(context.TODO(), bson.M{"_id": link.Id}, link)
	return err
}