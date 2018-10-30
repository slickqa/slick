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
	panic("implement me")
}

func (SlickAgentsService) AddQueuedAction(ctx context.Context, action *slickqa.AgentQueuedAction) (*slickqa.AgentQueuedAction, error) {
	err := agentPermissionCheck(ctx, action.Target.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	panic("implement me")
}

func (SlickAgentsService) GetAgentRunStatus(ctx context.Context, agentId*slickqa.AgentId) (*slickqa.AgentRunStatus, error) {
	err := agentPermissionCheck(ctx, agentId.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	panic("implement me")
}

func (SlickAgentsService) SetAgentRunStatus(ctx context.Context, agentRunStatus *slickqa.AgentRunStatus) (*slickqa.AgentRunStatus, error) {
	err := agentPermissionCheck(ctx, agentRunStatus.Id.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	panic("implement me")
}

func (SlickAgentsService) UpdateScreenshot(ctx context.Context, agentId *slickqa.ScreenshotUpdateRequest) (*slickqa.AgentStatus, error) {
	err := agentPermissionCheck(ctx, agentId.Id.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	agentStatus, err := db.Agents.UpdateScreenshotTimestamp(agentId.Id)
	return agentStatus, err
}

func (SlickAgentsService) UpdateStatus(ctx context.Context, agentStatus *slickqa.AgentStatus) (*slickqa.AgentStatus, error) {
	err := agentPermissionCheck(ctx, agentStatus.Id.Company)
	if err != nil {
		return nil, status.Error(codes.PermissionDenied, err.Error())
	}
	agentStatus, err = db.Agents.UpdateStatus(agentStatus)
	return agentStatus, err
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
	return &slickqa.AgentsResponse{
		Agents: agents,
	}, nil
}



