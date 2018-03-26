/** @module Projects */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @return {Promise<HttpResponse<slickqaProjectsListResponse>>}
 */
export function GetProjects() {
  return gateway.request(GetProjectsOperation)
}

/**
 * @param {string} Company
 * @param {string} Name
 * @return {Promise<HttpResponse<slickqaProject>>}
 */
export function GetProjectByName(Company, Name) {
  const parameters = {
    path: {
      Company,
      Name
    }
  }
  return gateway.request(GetProjectByNameOperation, parameters)
}

const GetProjectsOperation = {
  path: '/api/projects',
  method: 'get'
}

const GetProjectByNameOperation = {
  path: '/api/projects/{Company}/{Name}',
  method: 'get'
}
