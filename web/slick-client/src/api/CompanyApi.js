/**
 * slick.proto
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: version not set
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

    const ApiClient = require('../ApiClient'),
     SlickqaCompanySettings = require('../model/SlickqaCompanySettings');

  /**
   * Company service.
   * @module api/CompanyApi
   * @version 0.1.0
   */

  /**
   * Constructs a new CompanyApi. 
   * @alias module:api/CompanyApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the createCompanySettings operation.
     * @callback module:api/CompanyApi~createCompanySettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SlickqaCompanySettings} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/SlickqaCompanySettings} body 
     * @param {module:api/CompanyApi~createCompanySettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SlickqaCompanySettings}
     */
    this.createCompanySettings = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling createCompanySettings");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = SlickqaCompanySettings;

      return this.apiClient.callApi(
        '/api/companies', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCompanySettings operation.
     * @callback module:api/CompanyApi~getCompanySettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SlickqaCompanySettings} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} companyName 
     * @param {module:api/CompanyApi~getCompanySettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SlickqaCompanySettings}
     */
    this.getCompanySettings = function(companyName, callback) {
      var postBody = null;

      // verify the required parameter 'companyName' is set
      if (companyName == undefined || companyName == null) {
        throw new Error("Missing the required parameter 'companyName' when calling getCompanySettings");
      }


      var pathParams = {
        'CompanyName': companyName
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = SlickqaCompanySettings;

      return this.apiClient.callApi(
        '/api/companies/{CompanyName}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateCompanySettings operation.
     * @callback module:api/CompanyApi~updateCompanySettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SlickqaCompanySettings} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} companyName 
     * @param {module:model/SlickqaCompanySettings} body 
     * @param {module:api/CompanyApi~updateCompanySettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SlickqaCompanySettings}
     */
    this.updateCompanySettings = function(companyName, body, callback) {
      var postBody = body;

      // verify the required parameter 'companyName' is set
      if (companyName == undefined || companyName == null) {
        throw new Error("Missing the required parameter 'companyName' when calling updateCompanySettings");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling updateCompanySettings");
      }


      var pathParams = {
        'CompanyName': companyName
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = SlickqaCompanySettings;

      return this.apiClient.callApi(
        '/api/companies/{CompanyName}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  module.exports = exports;