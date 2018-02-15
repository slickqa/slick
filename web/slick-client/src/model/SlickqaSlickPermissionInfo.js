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

    // CommonJS-like environments that support module.exports, like Node.
    const ApiClient = require('../ApiClient')
    , SlickqaCompanyPermissionInfo = require('./SlickqaCompanyPermissionInfo')





  /**
   * The SlickqaSlickPermissionInfo model module.
   * @module model/SlickqaSlickPermissionInfo
   * @version 0.1.0
   */

  /**
   * Constructs a new <code>SlickqaSlickPermissionInfo</code>.
   * @alias module:model/SlickqaSlickPermissionInfo
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>SlickqaSlickPermissionInfo</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SlickqaSlickPermissionInfo} obj Optional instance to populate.
   * @return {module:model/SlickqaSlickPermissionInfo} The populated <code>SlickqaSlickPermissionInfo</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('SlickAdmin')) {
        obj['SlickAdmin'] = ApiClient.convertToType(data['SlickAdmin'], 'Number');
      }
      if (data.hasOwnProperty('Companies')) {
        obj['Companies'] = ApiClient.convertToType(data['Companies'], [SlickqaCompanyPermissionInfo]);
      }
    }
    return obj;
  }

  /**
   * @member {Number} SlickAdmin
   */
  exports.prototype['SlickAdmin'] = undefined;
  /**
   * @member {Array.<module:model/SlickqaCompanyPermissionInfo>} Companies
   */
  exports.prototype['Companies'] = undefined;



  module.exports = exports;


