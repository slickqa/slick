import BrowserStorage from './BrowserStorage';

/**
 * @typedef {Object} SlickCompany
 *
 * @property {Number} a
 * @property {Object.<string,Number>} proj
 */

/**
 * @typedef {Object} SlickPermissions
 *
 * @property {Number} sa
 * @property {Object.<string, SlickCompany>} co
 */

/**
 * @typedef {Object} JwtPayload
 *
 * @property {Number} exp
 * @property {Number} iat
 * @property {string} given_name
 * @property {string} name
 * @property {string} sub
 * @property {SlickPermissions} sp
 */

class TokenApi {
  constructor() {
  }

  /**
   * Get the payload from the jwt token
   * @returns {JwtPayload}
   */
  get DecodedJwt() {
    return JSON.parse(atob(BrowserStorage.Token.split('.')[1]))
  }

  /**
   * Is the current user a slick admin?
   * @returns {boolean}
   */
  isSlickAdmin() {
    return (typeof this.DecodedJwt.sp.sa !== 'undefined' && this.DecodedJwt.sp.sa !== 0)
  }

  /**
   * Is the current user a company admin
   * @param {string} company
   * @returns {boolean}
   */
  isCompanyAdmin(company) {
    return this.isSlickAdmin() || ((typeof this.DecodedJwt.sp.co !== 'undefined') && (typeof this.DecodedJwt.sp.co[company] !== 'undefined') && this.DecodedJwt.sp.co[company].a !== 0)
  }

  /**
   * Does the token expire within a certain period of time.
   * @param {Number} seconds
   * @returns {boolean}
   */
  expiresWithin(seconds) {

  }

  /**
   * Does the token expire within a certain period of time.
   * @param {Number} seconds
   * @returns {boolean}
   */
  expiresWithin(seconds) {

  }
}

let token = new TokenApi();

export default token;
