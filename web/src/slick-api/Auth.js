/** @module Auth */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @param {string} CompanyName 
 * @param {string} ProjectName 
 * @param {number} Permission 
 * @return {Promise<HttpResponse<slickqaIsAuthorizedResponse>>} 
 */
export function IsAuthorized(CompanyName, ProjectName, Permission) {
  const parameters = {
    path: {
      CompanyName,
      ProjectName,
      Permission
    }
  }
  return gateway.request(IsAuthorizedOperation, parameters)
}

/**
 * @param {slickqaPlainUserLoginRequest} body 
 * @return {Promise<HttpResponse<slickqaLoginResponse>>} 
 */
export function LoginWithCredentials(body) {
  const parameters = {
    body: {
      body
    }
  }
  return gateway.request(LoginWithCredentialsOperation, parameters)
}

/**
 * @param {string} Token 
 * @return {Promise<HttpResponse<slickqaLoginResponse>>} 
 */
export function LoginWithToken(Token) {
  const parameters = {
    path: {
      Token
    }
  }
  return gateway.request(LoginWithTokenOperation, parameters)
}

const IsAuthorizedOperation = {
  path: '/api/auth/isAuthorized/{CompanyName}/{ProjectName}/{Permission}',
  method: 'get'
}

const LoginWithCredentialsOperation = {
  path: '/api/auth/login',
  contentTypes: ['application/json'],
  method: 'post'
}

const LoginWithTokenOperation = {
  path: '/api/auth/login-with-token/{Token}',
  method: 'get'
}
