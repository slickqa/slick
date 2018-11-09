package db

import (
	"github.com/globalsign/mgo"
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

func (a agentsType) UpdateStatus(id slickqa.AgentId, status *slickqa.AgentStatus) (*slickqa.Agent, error) {
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

	return a.GetAgentWithMongoConnection(&id, mongo)
}

func (a agentsType) UpdateScreenshotTimestamp(id *slickqa.AgentId) (*slickqa.Agent, error) {
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
	return a.GetAgentWithMongoConnection(id, mongo)
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
			"checkIn.seconds": bson.M{
				"$gt": request.UpdatedSince.Seconds,
			},
		}
	}
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Find(query).All(&agents)
	return agents, err
}

func (a agentsType) GetAgent(id *slickqa.AgentId) (*slickqa.Agent, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()
	return a.GetAgentWithMongoConnection(id, mongo)
}

func (agentsType) GetAgentWithMongoConnection(id *slickqa.AgentId, mongo *mgo.Session) (*slickqa.Agent, error) {
	var agent slickqa.Agent
	err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Find(bson.M{"_id": id}).One(&agent)
	return &agent, err
}

func (a agentsType) UpdateGivenRunStatus(id *slickqa.AgentId, runStatus string) (*slickqa.Agent, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()

	_, err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Upsert(bson.M{"_id": id}, bson.M{"givenRunStatus": runStatus})

	if err != nil {
		return nil, err
	}

	return a.GetAgentWithMongoConnection(id, mongo)
}

func (a agentsType) UpdateGivenAction(id *slickqa.AgentId, action string, actionParameter string) (*slickqa.Agent, error) {
	mongo := MongoSession.Copy()
	defer mongo.Close()

	_, err := mongo.DB(slickconfig.Configuration.Mongo.Database).C(AgentsCollectionName).Upsert(bson.M{"_id": id}, bson.M{"givenAction": action, "givenActionParameter": actionParameter})

	if err != nil {
		return nil, err
	}

	return a.GetAgentWithMongoConnection(id, mongo)
}