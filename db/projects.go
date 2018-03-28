package db

import (
	"github.com/slickqa/slick/slickqa"
	"github.com/slickqa/slick/slickconfig"
	"github.com/globalsign/mgo/bson"
	"github.com/golang/protobuf/ptypes"
)

const (
	ProjectsCollectionName = "projects"
)

type projectType struct {}
var Projects = projectType{}

func (*projectType) GetProject(company string, name string) (*slickqa.Project, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	var retval *slickqa.Project
	var err error
	err = mongo.DB(slickconfig.Configuration.Mongo.Database).C(ProjectsCollectionName).Find(bson.M{"_id": slickqa.ProjectIdentity{Company:company, Name:name}}).One(retval)
	return retval, err
}

func (*projectType) GetProjectsFromList(ids []*slickqa.ProjectIdentity) ([]*slickqa.Project, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	retval := make([]*slickqa.Project, 0)
	var err error
	err = mongo.DB(slickconfig.Configuration.Mongo.Database).C(ProjectsCollectionName).Find(bson.M{ "_id": bson.M{"$in": ids}}).All(&retval)
	return retval, err
}

func (*projectType) GetAllProjects(company string) ([]*slickqa.Project, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	retval := make([]*slickqa.Project, 0)
	var err error
	if company == "" {
		err = mongo.DB(slickconfig.Configuration.Mongo.Database).C(ProjectsCollectionName).Find(nil).All(&retval)
	} else {
		err = mongo.DB(slickconfig.Configuration.Mongo.Database).C(ProjectsCollectionName).Find(bson.M{ "_id": slickqa.ProjectIdentity{Company: company}}).All(&retval)
	}
	return retval, err
}

func (*projectType) AddProject(id slickqa.ProjectIdentity) (*slickqa.Project, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	project := &slickqa.Project {
		Id: &id,
		Attributes: make(map[string]string, 0),
		AutomationTools: make([]string, 0),
		Tags: make([]string, 0),
		Links: make([]*slickqa.Link, 0),
		LastUpdated: ptypes.TimestampNow(),
	}
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(ProjectsCollectionName).Insert(&project)
	return project, err
}
