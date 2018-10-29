package services

import (
	"github.com/slickqa/slick/slickqa"
	"golang.org/x/net/context"
)

type SlickAgentsService struct {}

func (SlickAgentsService) UpdateStatus(ctx context.Context, status *slickqa.AgentStatus) (*slickqa.AgentStatus, error) {
	panic("implement me")
}

func (SlickAgentsService) GetAgents(ctx context.Context, status *slickqa.AgentsRequest) (*slickqa.AgentsResponse, error) {
	panic("implement me")
}



