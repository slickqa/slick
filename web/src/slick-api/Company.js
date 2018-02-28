/** @module Company */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @param {slickqaCompanySettings} body 
 * @return {Promise<HttpResponse<slickqaCompanySettings>>} 
 */
export function CreateCompanySettings(body) {
  const parameters = {
    body: {
      body
    }
  }
  return gateway.request(CreateCompanySettingsOperation, parameters)
}

/**
 * @param {string} CompanyName 
 * @return {Promise<HttpResponse<slickqaCompanySettings>>} 
 */
export function GetCompanySettings(CompanyName) {
  const parameters = {
    path: {
      CompanyName
    }
  }
  return gateway.request(GetCompanySettingsOperation, parameters)
}

/**
 * @param {string} CompanyName 
 * @param {slickqaCompanySettings} body 
 * @return {Promise<HttpResponse<slickqaCompanySettings>>} 
 */
export function UpdateCompanySettings(CompanyName, body) {
  const parameters = {
    path: {
      CompanyName
    },
    body: {
      body
    }
  }
  return gateway.request(UpdateCompanySettingsOperation, parameters)
}

const CreateCompanySettingsOperation = {
  path: '/api/companies',
  contentTypes: ['application/json'],
  method: 'post'
}

const GetCompanySettingsOperation = {
  path: '/api/companies/{CompanyName}',
  method: 'get'
}

const UpdateCompanySettingsOperation = {
  path: '/api/companies/{CompanyName}',
  contentTypes: ['application/json'],
  method: 'put'
}
