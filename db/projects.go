package db

import (
	"context"
	"fmt"
	"github.com/golang/protobuf/ptypes"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	ProjectsCollectionName = "projects"
)

type projectType struct {}
var Projects = projectType{}

func (*projectType) GetProject(company string, name string) (*slickqa.Project, error) {
	var retval *slickqa.Project
	findResult := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(ProjectsCollectionName).FindOne(context.TODO(), bson.M{"_id": slickqa.ProjectIdentity{Company:company, Name:name}})
	if findResult == nil || findResult.Err() != nil {
		return nil, fmt.Errorf("cannot find project %s belonging to company %s", name, company)
	}
	err := findResult.Decode(retval)
	return retval, err
}

func (*projectType) GetProjectsFromList(ids []*slickqa.ProjectIdentity) ([]*slickqa.Project, error) {
	retval := make([]*slickqa.Project, 0)
	cursor, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(ProjectsCollectionName).Find(context.TODO(), bson.M{ "_id": bson.M{"$in": ids}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	err = cursor.All(context.TODO(), &retval)
	return retval, err
}

func (*projectType) GetAllProjects(company string) ([]*slickqa.Project, error) {
	retval := make([]*slickqa.Project, 0)
	var (
		err error
		cursor *mongo.Cursor
	)
	if company == "" {
		cursor, err = Client.Database(slickconfig.Configuration.Mongo.Database).Collection(ProjectsCollectionName).Find(context.TODO(), bson.M{})
	} else {
		cursor, err = Client.Database(slickconfig.Configuration.Mongo.Database).Collection(ProjectsCollectionName).Find(context.TODO(), bson.M{ "_id": slickqa.ProjectIdentity{Company: company}})
	}
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	err = cursor.All(context.TODO(), &retval)
	return retval, err
}

func (*projectType) AddProject(id slickqa.ProjectIdentity) (*slickqa.Project, error) {
	project := &slickqa.Project {
		Id: &id,
		Attributes: make(map[string]string, 0),
		AutomationTools: make([]string, 0),
		Tags: make([]string, 0),
		Links: make([]*slickqa.Link, 0),
		LastUpdated: ptypes.TimestampNow(),
	}
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(ProjectsCollectionName).InsertOne(context.TODO(), &project)
	return project, err
}
