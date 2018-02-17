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
    instance = new SlickClient.SlickqaVersionInfoResponse();
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

  describe('SlickqaVersionInfoResponse', function() {
    it('should create an instance of SlickqaVersionInfoResponse', function() {
      // uncomment below and update the code to test SlickqaVersionInfoResponse
      //var instane = new SlickClient.SlickqaVersionInfoResponse();
      //expect(instance).to.be.a(SlickClient.SlickqaVersionInfoResponse);
    });

    it('should have the property version (base name: "Version")', function() {
      // uncomment below and update the code to test the property version
      //var instane = new SlickClient.SlickqaVersionInfoResponse();
      //expect(instance).to.be();
    });

  });

}));
