/** @module Links */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @param {string} Company 
 * @param {string} Project 
 * @param {string} EntityType 
 * @param {string} EntityId 
 * @return {Promise<HttpResponse<slickqaLinkList>>} 
 */
export function GetLinkList(Company, Project, EntityType, EntityId) {
  const parameters = {
    path: {
      Company,
      Project,
      EntityType,
      EntityId
    }
  }
  return gateway.request(GetLinkListOperation, parameters)
}

/**
 * @param {string} Id.Company 
 * @param {string} Id.Project 
 * @param {string} Id.EntityType 
 * @param {string} Id.EntityId 
 * @param {string} LinkName 
 * @return {Promise<HttpResponse<slickqaLinkList>>} 
 */
export function RemoveLink(Id.Company, Id.Project, Id.EntityType, Id.EntityId, LinkName) {
  const parameters = {
    path: {
      'Id.Company': Id.Company,
      'Id.Project': Id.Project,
      'Id.EntityType': Id.EntityType,
      'Id.EntityId': Id.EntityId,
      LinkName
    }
  }
  return gateway.request(RemoveLinkOperation, parameters)
}

/**
 * @param {string} Id.Company 
 * @param {string} Id.Project 
 * @param {string} Id.EntityType 
 * @param {string} Id.EntityId 
 * @param {string} LinkName 
 * @param {slickqaLink} body 
 * @return {Promise<HttpResponse<slickqaLinkList>>} 
 */
export function AddLinkToList(Id.Company, Id.Project, Id.EntityType, Id.EntityId, LinkName, body) {
  const parameters = {
    path: {
      'Id.Company': Id.Company,
      'Id.Project': Id.Project,
      'Id.EntityType': Id.EntityType,
      'Id.EntityId': Id.EntityId,
      LinkName
    },
    body: {
      body
    }
  }
  return gateway.request(AddLinkToListOperation, parameters)
}

/**
 * @param {string} Id.Company 
 * @param {string} Id.Project 
 * @param {string} Id.EntityType 
 * @param {string} Id.EntityId 
 * @param {string} LinkName 
 * @param {slickqaLink} body 
 * @return {Promise<HttpResponse<slickqaLinkList>>} 
 */
export function UpdateLink(Id.Company, Id.Project, Id.EntityType, Id.EntityId, LinkName, body) {
  const parameters = {
    path: {
      'Id.Company': Id.Company,
      'Id.Project': Id.Project,
      'Id.EntityType': Id.EntityType,
      'Id.EntityId': Id.EntityId,
      LinkName
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateLinkOperation, parameters)
}

const GetLinkListOperation = {
  path: '/api/links/{Company}/{Project}/{EntityType}/{EntityId}',
  method: 'get'
}

const RemoveLinkOperation = {
  path: '/api/links/{Id.Company}/{Id.Project}/{Id.EntityType}/{Id.EntityId}/{LinkName}',
  method: 'delete'
}

const AddLinkToListOperation = {
  path: '/api/links/{Id.Company}/{Id.Project}/{Id.EntityType}/{Id.EntityId}/{LinkName}',
  contentTypes: ['application/json'],
  method: 'post'
}

const UpdateLinkOperation = {
  path: '/api/links/{Id.Company}/{Id.Project}/{Id.EntityType}/{Id.EntityId}/{LinkName}',
  contentTypes: ['application/json'],
  method: 'put'
}
