package db

import (
	"context"
	"fmt"
	"github.com/golang/protobuf/ptypes"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	AgentsCollectionName = "agents"
)

type agentsType struct {}
var Agents = agentsType{}

func (a agentsType) UpdateStatus(id slickqa.AgentId, status *slickqa.AgentStatus) (*slickqa.Agent, error) {
	update := bson.M{
		"$set": bson.M{
			"status": status,
			"checkIn": ptypes.TimestampNow(),
		},
	}
	query := bson.M{
		"_id": id,
	}
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(AgentsCollectionName).UpdateOne(context.TODO(), query, update, options.Update().SetUpsert(true))
	if err != nil {
		return nil, err
	}

	return a.GetAgent(&id)
}

func (a agentsType) UpdateScreenshotTimestamp(id *slickqa.AgentId) (*slickqa.Agent, error) {
	query := bson.M{
		"_id": id,
	}
	update := bson.M{
		"$set": bson.M{
			"checkIn": ptypes.TimestampNow(),
			"screenshotUpdate": ptypes.TimestampNow(),
		},
	}
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(AgentsCollectionName).UpdateOne(context.TODO(), query, update, options.Update().SetUpsert(true))
	if err != nil {
		return nil, err
	}
	return a.GetAgent(id)
}

func (agentsType) FindAgents(request *slickqa.AgentsRequest) ([]*slickqa.Agent, error) {
	var agents []*slickqa.Agent
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
	cursor, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(AgentsCollectionName).Find(context.TODO(), query)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())
	err = cursor.All(context.TODO(), &agents)
	if err != nil {
		return nil, err
	}
	return agents, err
}

func (a agentsType) GetAgent(id *slickqa.AgentId) (*slickqa.Agent, error) {
	var agent slickqa.Agent
	findResult := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(AgentsCollectionName).FindOne(context.TODO(), bson.M{"_id": id})
	if findResult == nil || findResult.Err() != nil {
		return nil, fmt.Errorf("agent with id %+v not found", id)
	}
	err := findResult.Decode(&agent)
	return &agent, err
}

func (a agentsType) UpdateGivenRunStatus(id *slickqa.AgentId, runStatus string) (*slickqa.Agent, error) {
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(AgentsCollectionName).UpdateOne(context.TODO(), bson.M{"_id": id}, bson.M{"$set": bson.M{"givenRunStatus": runStatus}}, options.Update().SetUpsert(true))

	if err != nil {
		return nil, err
	}

	return a.GetAgent(id)
}

func (a agentsType) UpdateGivenAction(id *slickqa.AgentId, action string, actionParameter string) (*slickqa.Agent, error) {
	_, err := Client.Database(slickconfig.Configuration.Mongo.Database).Collection(AgentsCollectionName).UpdateOne(context.TODO(), bson.M{"_id": id}, bson.M{"$set": bson.M{"givenAction": action, "givenActionParameter": actionParameter}}, options.Update().SetUpsert(true))

	if err != nil {
		return nil, err
	}

	return a.GetAgent(id)
}