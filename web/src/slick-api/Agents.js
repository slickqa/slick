/** @module Agents */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

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

const UpdateStatusOperation = {
  path: '/api/agents/{Id.Company}/{Id.Name}/status',
  contentTypes: ['application/json'],
  method: 'post'
}
