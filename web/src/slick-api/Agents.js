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
 * @param {string} Id_Company 
 * @param {string} Id_Name 
 * @param {slickqaAgentQueuedAction} body 
 * @return {Promise<HttpResponse<slickqaAgent>>} A successful response.
 */
export function AddQueuedAction(Id_Company, Id_Name, body) {
  const parameters = {
    path: {
      'Id_Company': Id_Company,
      'Id_Name': Id_Name
    },
    body: {
      body
    }
  }
  return gateway.request(AddQueuedActionOperation, parameters)
}

/**
 * @param {string} Id_Company 
 * @param {string} Id_Name 
 * @param {slickqaAgentRunStatus} body 
 * @return {Promise<HttpResponse<slickqaAgent>>} A successful response.
 */
export function SetAgentRunStatus(Id_Company, Id_Name, body) {
  const parameters = {
    path: {
      'Id_Company': Id_Company,
      'Id_Name': Id_Name
    },
    body: {
      body
    }
  }
  return gateway.request(SetAgentRunStatusOperation, parameters)
}

/**
 * @param {string} Id_Company 
 * @param {string} Id_Name 
 * @param {slickqaScreenshotUpdateRequest} body 
 * @return {Promise<HttpResponse<slickqaAgent>>} A successful response.
 */
export function UpdateScreenshotTimestamp(Id_Company, Id_Name, body) {
  const parameters = {
    path: {
      'Id_Company': Id_Company,
      'Id_Name': Id_Name
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateScreenshotTimestampOperation, parameters)
}

/**
 * @param {string} Id_Company 
 * @param {string} Id_Name 
 * @param {slickqaAgentStatusUpdate} body 
 * @return {Promise<HttpResponse<slickqaAgent>>} A successful response.
 */
export function UpdateStatus(Id_Company, Id_Name, body) {
  const parameters = {
    path: {
      'Id_Company': Id_Company,
      'Id_Name': Id_Name
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateStatusOperation, parameters)
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
  path: '/api/agents/{Company}/{Name}/run-status',
  method: 'get'
}

const AddQueuedActionOperation = {
  path: '/api/agents/{Id_Company}/{Id_Name}/action',
  contentTypes: ['application/json'],
  method: 'post'
}

const SetAgentRunStatusOperation = {
  path: '/api/agents/{Id_Company}/{Id_Name}/run-status',
  contentTypes: ['application/json'],
  method: 'put'
}

const UpdateScreenshotTimestampOperation = {
  path: '/api/agents/{Id_Company}/{Id_Name}/screenshot',
  contentTypes: ['application/json'],
  method: 'put'
}

const UpdateStatusOperation = {
  path: '/api/agents/{Id_Company}/{Id_Name}/status',
  contentTypes: ['application/json'],
  method: 'post'
}
