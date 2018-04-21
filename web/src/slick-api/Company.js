/** @module Company */
// Auto-generated, edits will be overwritten
import * as gateway from './gateway'

/**
 * @return {Promise<HttpResponse<slickqaAvailableCompanySettings>>}
 */
export function GetAvailableCompanySettings() {
  return gateway.request(GetAvailableCompanySettingsOperation)
}

/**
 * @param {slickqaCompanySettingsRequest} body 
 * @return {Promise<HttpResponse<slickqaCompanySettings>>} 
 */
export function AddCompanySettings(body) {
  const parameters = {
    body: {
      body
    }
  }
  return gateway.request(AddCompanySettingsOperation, parameters)
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

const GetAvailableCompanySettingsOperation = {
  path: '/api/companies',
  method: 'get'
}

const AddCompanySettingsOperation = {
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
