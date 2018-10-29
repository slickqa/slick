package db

import "github.com/slickqa/slick/slickqa"

const (
	AgentsCollectionName = "agents"
)

type agentsType struct {}
var Agents = agentsType{}

func (agentsType) UpdateStatus(status *slickqa.AgentStatus) (*slickqa.AgentStatus, error) {
	return nil, nil
}

