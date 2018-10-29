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

const GetAgentsOperation = {
  path: '/api/agents/{Company}',
  method: 'get'
}

const UpdateScreenshotOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/screenshot',
  contentTypes: ['application/json'],
  method: 'post'
}

const UpdateStatusOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/status',
  contentTypes: ['application/json'],
  method: 'post'
}
