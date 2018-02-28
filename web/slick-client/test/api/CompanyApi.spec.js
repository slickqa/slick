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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.SlickClient);
  }
}(this, function(expect, SlickClient) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new SlickClient.CompanyApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('CompanyApi', function() {
    describe('createCompanySettings', function() {
      it('should call createCompanySettings successfully', function(done) {
        //uncomment below and update the code to test createCompanySettings
        //instance.createCompanySettings(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCompanySettings', function() {
      it('should call getCompanySettings successfully', function(done) {
        //uncomment below and update the code to test getCompanySettings
        //instance.getCompanySettings(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateCompanySettings', function() {
      it('should call updateCompanySettings successfully', function(done) {
        //uncomment below and update the code to test updateCompanySettings
        //instance.updateCompanySettings(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
