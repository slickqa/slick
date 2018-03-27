package db

import (
	"github.com/slickqa/slick/slickqa"
	"github.com/slickqa/slick/slickconfig"
	"github.com/globalsign/mgo/bson"
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

func (p *projectType) GetAllProjects(company string) ([]*slickqa.Project, error) {
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
