/** @module Agents */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @param {string} Company 
 * @return {Promise<HttpResponse<slickqaAgentsResponse>>} A successful response.
 */
export function GetAgents(Company) {
  const parameters = {
    path: {
      Company
    }
  }
  return gateway.request(GetAgentsOperation, parameters)
}

/**
 * @param {string} Company 
 * @param {string} Name 
 * @return {Promise<HttpResponse<slickqaAgentQueuedAction>>} A successful response.
 */
export function GetQueuedAction(Company, Name) {
  const parameters = {
    path: {
      Company,
      Name
    }
  }
  return gateway.request(GetQueuedActionOperation, parameters)
}

/**
 * @param {string} Company 
 * @param {string} Name 
 * @return {Promise<HttpResponse<slickqaAgentRunStatus>>} A successful response.
 */
export function GetAgentRunStatus(Company, Name) {
  const parameters = {
    path: {
      Company,
      Name
    }
  }
  return gateway.request(GetAgentRunStatusOperation, parameters)
}

/**
 * @param {string} Id.Company 
 * @param {string} Id.Name 
 * @param {slickqaAgentQueuedAction} body 
 * @return {Promise<HttpResponse<slickqaAgent>>} A successful response.
 */
export function AddQueuedAction(Id.Company, Id.Name, body) {
  const parameters = {
    path: {
      'Id.Company': Id.Company,
      'Id.Name': Id.Name
    },
    body: {
      body
    }
  }
  return gateway.request(AddQueuedActionOperation, parameters)
}

/**
 * @param {string} Id.Company 
 * @param {string} Id.Name 
 * @param {slickqaAgentRunStatus} body 
 * @return {Promise<HttpResponse<slickqaAgentRunStatus>>} A successful response.
 */
export function SetAgentRunStatus(Id.Company, Id.Name, body) {
  const parameters = {
    path: {
      'Id.Company': Id.Company,
      'Id.Name': Id.Name
    },
    body: {
      body
    }
  }
  return gateway.request(SetAgentRunStatusOperation, parameters)
}

/**
 * @param {string} Id.Company 
 * @param {string} Id.Name 
 * @param {slickqaScreenshotUpdateRequest} body 
 * @return {Promise<HttpResponse<slickqaAgent>>} A successful response.
 */
export function UpdateScreenshotTimestamp(Id.Company, Id.Name, body) {
  const parameters = {
    path: {
      'Id.Company': Id.Company,
      'Id.Name': Id.Name
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateScreenshotTimestampOperation, parameters)
}

/**
 * @param {string} Id.Company 
 * @param {string} Id.Name 
 * @param {slickqaAgentStatusUpdate} body 
 * @return {Promise<HttpResponse<slickqaAgent>>} A successful response.
 */
export function UpdateStatus(Id.Company, Id.Name, body) {
  const parameters = {
    path: {
      'Id.Company': Id.Company,
      'Id.Name': Id.Name
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateStatusOperation, parameters)
}

const GetAgentsOperation = {
  path: '/api/agents/{Company}',
  method: 'post'
}

const GetQueuedActionOperation = {
  path: '/api/agents/{Company}/{Name}/action',
  method: 'get'
}

const GetAgentRunStatusOperation = {
  path: '/api/agents/{Company}/{Name}/run-status',
  method: 'get'
}

const AddQueuedActionOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/action',
  contentTypes: ['application/json'],
  method: 'post'
}

const SetAgentRunStatusOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/run-status',
  contentTypes: ['application/json'],
  method: 'put'
}

const UpdateScreenshotTimestampOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/screenshot',
  contentTypes: ['application/json'],
  method: 'put'
}

const UpdateStatusOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/status',
  contentTypes: ['application/json'],
  method: 'post'
}
