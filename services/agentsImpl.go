package services

import (
	"fmt"
	"github.com/slickqa/slick/db"
	"github.com/slickqa/slick/jwtauth"
	"github.com/slickqa/slick/slickconfig"
	"github.com/slickqa/slick/slickqa"
	"golang.org/x/net/context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type SlickAgentsService struct {}

func agentPermissionCheck(ctx context.Context, company string) error {
	claims, err := jwtauth.GetClaimsFromContext(ctx)
	if err != nil {
		return err
	}

	if claims.Permissions.SlickAdmin != 0 {
		return nil
	}
	companyPermission, ok := claims.Permissions.Companies[company]

	if !ok {
		return fmt.Errorf("no permissions for company %s", company)
	}

	if companyPermission.CompanyAdmin != 0 {
		return nil
	}

	for _, permission := range companyPermission.ProjectPermissions {
		if permission & slickconfig.PERMISSION_RESULT_WRITE  > 0 {
			return nil
		}
	}

	return fmt.Errorf("you need write permission to results for at least one project on %s", company)
}

func (SlickAgentsService) GetQueuedAction(ctx context.Context, agentId *slickqa.AgentId) (*slickqa.AgentQueuedAction, error) {
	err := agentPermissionCheck(ctx, agentId.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	agent, err := db.Agents.GetAgent(agentId)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	return &slickqa.AgentQueuedAction{
		Id: agentId,
		Action: agent.GivenAction,
		ActionParameter: agent.GivenActionParameter,
	}, nil
}

func (SlickAgentsService) AddQueuedAction(ctx context.Context, action *slickqa.AgentQueuedAction) (*slickqa.Agent, error) {
	err := agentPermissionCheck(ctx, action.Id.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	agent, err := db.Agents.UpdateGivenAction(action.Id, action.Action, action.ActionParameter)

	return  agent, err
}

func (SlickAgentsService) GetAgentRunStatus(ctx context.Context, agentId *slickqa.AgentId) (*slickqa.AgentRunStatus, error) {
	err := agentPermissionCheck(ctx, agentId.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}

	agent, err := db.Agents.GetAgent(agentId)
	if err != nil {
		return nil, status.Error(codes.NotFound, err.Error())
	}

	runstatus := "IDLE"
	if agent.GivenRunStatus != "" {
		runstatus = agent.GivenRunStatus
	}

	return &slickqa.AgentRunStatus{
		Id: agentId,
		RunStatus: runstatus,
	}, nil
}

func (SlickAgentsService) SetAgentRunStatus(ctx context.Context, agentRunStatus *slickqa.AgentRunStatus) (*slickqa.Agent, error) {
	err := agentPermissionCheck(ctx, agentRunStatus.Id.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	return db.Agents.UpdateGivenRunStatus(agentRunStatus.Id, agentRunStatus.RunStatus)
}

func (SlickAgentsService) UpdateScreenshotTimestamp(ctx context.Context, agentId *slickqa.ScreenshotUpdateRequest) (*slickqa.Agent, error) {
	err := agentPermissionCheck(ctx, agentId.Id.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	agentStatus, err := db.Agents.UpdateScreenshotTimestamp(agentId.Id)
	return agentStatus, err
}

func (SlickAgentsService) UpdateStatus(ctx context.Context, agentStatus *slickqa.AgentStatusUpdate) (*slickqa.Agent, error) {
	err := agentPermissionCheck(ctx, agentStatus.Id.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	agent, err := db.Agents.UpdateStatus(*agentStatus.Id, agentStatus.Status)
	return agent, err
}

func (SlickAgentsService) GetAgents(ctx context.Context, agentQuery *slickqa.AgentsRequest) (*slickqa.AgentsResponse, error) {
	err := agentPermissionCheck(ctx, agentQuery.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	agents, err := db.Agents.FindAgents(agentQuery)
	if err != nil {
		return nil, err
	}
	linkService := SlickLinksService{}
	for _, agent := range agents {
		link, err := linkService.GetDownloadUrl(ctx, &slickqa.LinkIdentity{Company:agent.Id.Company, Project: "Agent", EntityType: "Agent", EntityId: agent.Id.Name, Name: "screen"})
		if err == nil {
			agent.Image = link.Url
		}
	}
	return &slickqa.AgentsResponse{
		Agents: agents,
	}, nil
}



