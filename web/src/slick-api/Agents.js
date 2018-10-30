/** @module Agents */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @param {string} Company 
 * @param {object} options Optional options
 * @param {date} [options.UpdatedSince] 
 * @return {Promise<HttpResponse<slickqaAgentsResponse>>} A successful response.
 */
export function GetAgents(Company, options) {
  if (!options) options = {}
  const parameters = {
    path: {
      Company
    },
    query: {
      UpdatedSince: gateway.formatDate(options.UpdatedSince, 'date-time')
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
 * @param {slickqaScreenshotUpdateRequest} body 
 * @return {Promise<HttpResponse<slickqaAgentStatus>>} A successful response.
 */
export function UpdateScreenshot(Id.Company, Id.Name, body) {
  const parameters = {
    path: {
      'Id.Company': Id.Company,
      'Id.Name': Id.Name
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateScreenshotOperation, parameters)
}

/**
 * @param {string} Id.Company 
 * @param {string} Id.Name 
 * @param {slickqaAgentStatus} body 
 * @return {Promise<HttpResponse<slickqaAgentStatus>>} A successful response.
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
 * @param {string} Target.Company 
 * @param {string} Target.Name 
 * @param {slickqaAgentQueuedAction} body 
 * @return {Promise<HttpResponse<slickqaAgentQueuedAction>>} A successful response.
 */
export function AddQueuedAction(Target.Company, Target.Name, body) {
  const parameters = {
    path: {
      'Target.Company': Target.Company,
      'Target.Name': Target.Name
    },
    body: {
      body
    }
  }
  return gateway.request(AddQueuedActionOperation, parameters)
}

const GetAgentsOperation = {
  path: '/api/agents/{Company}',
  method: 'get'
}

const GetQueuedActionOperation = {
  path: '/api/agents/{Company}/{Name}/action',
  method: 'get'
}

const GetAgentRunStatusOperation = {
  path: '/api/agents/{Company}/{Name}/status',
  method: 'get'
}

const UpdateScreenshotOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/screenshot',
  contentTypes: ['application/json'],
  method: 'put'
}

const UpdateStatusOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/status',
  contentTypes: ['application/json'],
  method: 'post'
}

const SetAgentRunStatusOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/status',
  contentTypes: ['application/json'],
  method: 'put'
}

const AddQueuedActionOperation = {
  path: '/api/agents/{Target.Company}/{Target.Name}/action',
  contentTypes: ['application/json'],
  method: 'post'
}
