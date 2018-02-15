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
     SlickqaUserInfo = require('../model/SlickqaUserInfo'),
     SlickqaUsersQueryResponse = require('../model/SlickqaUsersQueryResponse');

  /**
   * Users service.
   * @module api/UsersApi
   * @version 0.1.0
   */

  /**
   * Constructs a new UsersApi. 
   * @alias module:api/UsersApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getCurrentUserInfo operation.
     * @callback module:api/UsersApi~getCurrentUserInfoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SlickqaUserInfo} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/UsersApi~getCurrentUserInfoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SlickqaUserInfo}
     */
    this.getCurrentUserInfo = function(callback) {
      var postBody = null;


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
      var returnType = SlickqaUserInfo;

      return this.apiClient.callApi(
        '/api/users/current', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUserInfo operation.
     * @callback module:api/UsersApi~getUserInfoCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SlickqaUserInfo} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} emailAddress 
     * @param {module:api/UsersApi~getUserInfoCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SlickqaUserInfo}
     */
    this.getUserInfo = function(emailAddress, callback) {
      var postBody = null;

      // verify the required parameter 'emailAddress' is set
      if (emailAddress == undefined || emailAddress == null) {
        throw new Error("Missing the required parameter 'emailAddress' when calling getUserInfo");
      }


      var pathParams = {
        'EmailAddress': emailAddress
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
      var returnType = SlickqaUserInfo;

      return this.apiClient.callApi(
        '/api/users/info/{EmailAddress}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUsersForCompany operation.
     * @callback module:api/UsersApi~getUsersForCompanyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SlickqaUsersQueryResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} companyName 
     * @param {module:api/UsersApi~getUsersForCompanyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SlickqaUsersQueryResponse}
     */
    this.getUsersForCompany = function(companyName, callback) {
      var postBody = null;

      // verify the required parameter 'companyName' is set
      if (companyName == undefined || companyName == null) {
        throw new Error("Missing the required parameter 'companyName' when calling getUsersForCompany");
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
      var returnType = SlickqaUsersQueryResponse;

      return this.apiClient.callApi(
        '/api/users/by-company/{CompanyName}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUsersForProject operation.
     * @callback module:api/UsersApi~getUsersForProjectCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SlickqaUsersQueryResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {String} companyName 
     * @param {String} projectName 
     * @param {module:api/UsersApi~getUsersForProjectCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SlickqaUsersQueryResponse}
     */
    this.getUsersForProject = function(companyName, projectName, callback) {
      var postBody = null;

      // verify the required parameter 'companyName' is set
      if (companyName == undefined || companyName == null) {
        throw new Error("Missing the required parameter 'companyName' when calling getUsersForProject");
      }

      // verify the required parameter 'projectName' is set
      if (projectName == undefined || projectName == null) {
        throw new Error("Missing the required parameter 'projectName' when calling getUsersForProject");
      }


      var pathParams = {
        'CompanyName': companyName,
        'ProjectName': projectName
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
      var returnType = SlickqaUsersQueryResponse;

      return this.apiClient.callApi(
        '/api/users/by-project/{CompanyName}/{ProjectName}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  module.exports = exports;