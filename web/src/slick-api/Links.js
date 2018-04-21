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
export function GetLinks(Company, Project, EntityType, EntityId) {
  const parameters = {
    path: {
      Company,
      Project,
      EntityType,
      EntityId
    }
  }
  return gateway.request(GetLinksOperation, parameters)
}

/**
 * @param {string} Company 
 * @param {string} Project 
 * @param {string} EntityType 
 * @param {string} EntityId 
 * @param {string} Name 
 * @return {Promise<HttpResponse<slickqaLinkList>>} 
 */
export function RemoveLink(Company, Project, EntityType, EntityId, Name) {
  const parameters = {
    path: {
      Company,
      Project,
      EntityType,
      EntityId,
      Name
    }
  }
  return gateway.request(RemoveLinkOperation, parameters)
}

/**
 * @param {string} Company 
 * @param {string} Project 
 * @param {string} EntityType 
 * @param {string} EntityId 
 * @param {string} Name 
 * @return {Promise<HttpResponse<slickqaLinkUrl>>} 
 */
export function GetDownloadUrl(Company, Project, EntityType, EntityId, Name) {
  const parameters = {
    path: {
      Company,
      Project,
      EntityType,
      EntityId,
      Name
    }
  }
  return gateway.request(GetDownloadUrlOperation, parameters)
}

/**
 * @param {string} Id_Company 
 * @param {string} Id_Project 
 * @param {string} Id_EntityType 
 * @param {string} Id_EntityId 
 * @param {string} Id_Name 
 * @param {slickqaLink} body 
 * @return {Promise<HttpResponse<slickqaLinkList>>} 
 */
export function AddLink(Id_Company, Id_Project, Id_EntityType, Id_EntityId, Id_Name, body) {
  const parameters = {
    path: {
      'Id_Company': Id_Company,
      'Id_Project': Id_Project,
      'Id_EntityType': Id_EntityType,
      'Id_EntityId': Id_EntityId,
      'Id_Name': Id_Name
    },
    body: {
      body
    }
  }
  return gateway.request(AddLinkOperation, parameters)
}

/**
 * @param {string} Id_Company 
 * @param {string} Id_Project 
 * @param {string} Id_EntityType 
 * @param {string} Id_EntityId 
 * @param {string} Id_Name 
 * @param {slickqaLink} body 
 * @return {Promise<HttpResponse<slickqaLinkList>>} 
 */
export function UpdateLink(Id_Company, Id_Project, Id_EntityType, Id_EntityId, Id_Name, body) {
  const parameters = {
    path: {
      'Id_Company': Id_Company,
      'Id_Project': Id_Project,
      'Id_EntityType': Id_EntityType,
      'Id_EntityId': Id_EntityId,
      'Id_Name': Id_Name
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateLinkOperation, parameters)
}

/**
 * @param {string} Id_Company 
 * @param {string} Id_Project 
 * @param {string} Id_EntityType 
 * @param {string} Id_EntityId 
 * @param {string} Id_Name 
 * @param {slickqaFileUploadInfo} body 
 * @return {Promise<HttpResponse<slickqaLinkUrl>>} 
 */
export function GetUploadUrl(Id_Company, Id_Project, Id_EntityType, Id_EntityId, Id_Name, body) {
  const parameters = {
    path: {
      'Id_Company': Id_Company,
      'Id_Project': Id_Project,
      'Id_EntityType': Id_EntityType,
      'Id_EntityId': Id_EntityId,
      'Id_Name': Id_Name
    },
    body: {
      body
    }
  }
  return gateway.request(GetUploadUrlOperation, parameters)
}

const GetLinksOperation = {
  path: '/api/links/{Company}/{Project}/{EntityType}/{EntityId}',
  method: 'get'
}

const RemoveLinkOperation = {
  path: '/api/links/{Company}/{Project}/{EntityType}/{EntityId}/{Name}',
  method: 'delete'
}

const GetDownloadUrlOperation = {
  path: '/api/links/{Company}/{Project}/{EntityType}/{EntityId}/{Name}/download',
  method: 'get'
}

const AddLinkOperation = {
  path: '/api/links/{Id_Company}/{Id_Project}/{Id_EntityType}/{Id_EntityId}/{Id_Name}',
  contentTypes: ['application/json'],
  method: 'post'
}

const UpdateLinkOperation = {
  path: '/api/links/{Id_Company}/{Id_Project}/{Id_EntityType}/{Id_EntityId}/{Id_Name}',
  contentTypes: ['application/json'],
  method: 'put'
}

const GetUploadUrlOperation = {
  path: '/api/links/{Id_Company}/{Id_Project}/{Id_EntityType}/{Id_EntityId}/{Id_Name}/upload',
  contentTypes: ['application/json'],
  method: 'post'
}
