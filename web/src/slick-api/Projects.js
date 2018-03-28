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
 * @param {slickqaProjectIdentity} body
 * @return {Promise<HttpResponse<slickqaProject>>}
 */
export function AddProject(body) {
  const parameters = {
    body: {
      body
    }
  }
  return gateway.request(AddProjectOperation, parameters)
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

const AddProjectOperation = {
  path: '/api/projects',
  contentTypes: ['application/json'],
  method: 'post'
}

const GetProjectByNameOperation = {
  path: '/api/projects/{Company}/{Name}',
  method: 'get'
}
