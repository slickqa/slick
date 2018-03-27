/** @module Users */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @param {string} CompanyName 
 * @return {Promise<HttpResponse<slickqaUsersQueryResponse>>} 
 */
export function GetUsersForCompany(CompanyName) {
  const parameters = {
    path: {
      CompanyName
    }
  }
  return gateway.request(GetUsersForCompanyOperation, parameters)
}

/**
 * @param {string} CompanyName 
 * @param {slickqaAddUserRequest} body 
 * @return {Promise<HttpResponse<slickqaUserInfo>>} 
 */
export function AddUserToCompany(CompanyName, body) {
  const parameters = {
    path: {
      CompanyName
    },
    body: {
      body
    }
  }
  return gateway.request(AddUserToCompanyOperation, parameters)
}

/**
 * @param {string} CompanyName 
 * @param {string} ProjectName 
 * @return {Promise<HttpResponse<slickqaUsersQueryResponse>>} 
 */
export function GetUsersForProject(CompanyName, ProjectName) {
  const parameters = {
    path: {
      CompanyName,
      ProjectName
    }
  }
  return gateway.request(GetUsersForProjectOperation, parameters)
}

/**
 */
export function GetCurrentUserInfo() {
  return gateway.request(GetCurrentUserInfoOperation)
}

/**
 * @param {string} EmailAddress 
 * @return {Promise<HttpResponse<slickqaUserInfo>>} 
 */
export function GetUserInfo(EmailAddress) {
  const parameters = {
    path: {
      EmailAddress
    }
  }
  return gateway.request(GetUserInfoOperation, parameters)
}

/**
 * @param {string} EmailAddress 
 * @param {slickqaUserInfo} body 
 * @return {Promise<HttpResponse<slickqaUserInfo>>} 
 */
export function UpdateUser(EmailAddress, body) {
  const parameters = {
    path: {
      EmailAddress
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateUserOperation, parameters)
}

const GetUsersForCompanyOperation = {
  path: '/api/users/by-company/{CompanyName}',
  method: 'get'
}

const AddUserToCompanyOperation = {
  path: '/api/users/by-company/{CompanyName}',
  contentTypes: ['application/json'],
  method: 'post'
}

const GetUsersForProjectOperation = {
  path: '/api/users/by-project/{CompanyName}/{ProjectName}',
  method: 'get'
}

const GetCurrentUserInfoOperation = {
  path: '/api/users/current',
  method: 'get'
}

const GetUserInfoOperation = {
  path: '/api/users/info/{EmailAddress}',
  method: 'get'
}

const UpdateUserOperation = {
  path: '/api/users/{EmailAddress}',
  contentTypes: ['application/json'],
  method: 'put'
}
