package db

import (
	"github.com/globalsign/mgo/bson"
	"github.com/golang/protobuf/ptypes"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
)

const (
	AgentsCollectionName = "agents"
)

type agentsType struct {}
var Agents = agentsType{}

func (agentsType) UpdateStatus(id slickqa.AgentId, status *slickqa.AgentStatus) (*slickqa.Agent, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	update := bson.M{
		"$set": bson.M{
			"status": status,
			"checkIn": ptypes.TimestampNow(),
		},
	}
	query := bson.M{
		"_id": id,
	}
	_, err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Upsert(query, update)
	if err != nil {
		return nil, err
	}
	var agent slickqa.Agent
	err = mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Find(bson.M{"_id": id}).One(&agent)

	return &agent, err
}

func (agentsType) UpdateScreenshotTimestamp(id *slickqa.AgentId) (*slickqa.Agent, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	query := bson.M{
		"_id": id,
	}
	update := bson.M{
		"$set": bson.M{
			"checkIn": ptypes.TimestampNow(),
			"screenshotUpdate": ptypes.TimestampNow(),
		},
	}
	_, err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Upsert(query, update)
	if err != nil {
		return nil, err
	}
	var agent slickqa.Agent
	err = mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Find(bson.M{"_id": id}).One(&agent)

	return &agent, err
}

func (agentsType) FindAgents(request *slickqa.AgentsRequest) ([]*slickqa.Agent, error) {
	var agents []*slickqa.Agent
	mongo := MongoSession.Copy()
	defer mongo.Close()
	query := bson.M{
		"_id.company": request.Company,
	}
	if request.UpdatedSince != nil {
		query = bson.M{
			"_id.company": request.Company,
			"checkIn": bson.M{
				"$gt": request.UpdatedSince,
			},
		}
	}
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Find(query).All(&agents)
	return agents, err
}

