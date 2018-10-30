package db

import "github.com/slickqa/slick/slickqa"

const (
	AgentsCollectionName = "agents"
)

type agentsType struct {}
var Agents = agentsType{}

func (agentsType) UpdateStatus(status *slickqa.AgentStatus) (*slickqa.AgentStatus, error) {
	status.
	return nil, nil
}

func (agentsType) UpdateScreenshotTimestamp(id *slickqa.AgentId) (*slickqa.AgentStatus, error) {
	return nil, nil
}

func (agentsType) FindAgents(request *slickqa.AgentsRequest) ([]*slickqa.AgentStatus, error) {
	var agents []*slickqa.AgentStatus
	return agents, nil
}

