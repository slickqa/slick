import {observable, computed, action} from 'mobx';

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

export default class LoginState {
  /**
   * @type {JwtPayload}
   */
  @observable DecodedJwt = {};
  @observable LastCheck = Date.now();

  constructor() {
    this.reload();
    // every 5 seconds update the LastCheck time.
    this.interval = setInterval(() => {
      this.LastCheck = Date.now();
      if(this.expiresWithin(5)) {
        //TODO: refresh token
        console.log("Token about to expire");
      }
    }, 5000);
  }

  reload() {
    if(localStorage.token) {
      this.DecodedJwt = JSON.parse(atob(localStorage.token.split('.')[1]));
    } else {
      this.DecodedJwt = {};
    }
  }

  @action logout() {
    delete localStorage.token;
    this.reload();
  }

  @computed get IsLoggedIn() {
    return localStorage.token && Object.keys(this.DecodedJwt).length !== 0 && !this.IsExpired;
  }

  /**
   * Is the current user a slick admin?
   * @returns {boolean}
   */
  @computed get IsSlickAdmin() {
    return (typeof this.DecodedJwt.sp.sa !== 'undefined' && this.DecodedJwt.sp.sa !== 0)
  }

  /**
   * A list of companies the current user is an admin for.
   * @returns {Array<string>}
   */
  @computed get CompanyAdminList() {
    return Object.keys(this.DecodedJwt.sp.co).map((companyName) => {
      if((typeof(this.DecodedJwt.sp.co[companyName].a) !== 'undefined') && this.DecodedJwt.sp.co[companyName].a !== 0) {
        return companyName;
      }
    }).filter(item => item !== undefined);
  }

  /**
   *
   * @returns {Object<string, Array<string>>}
   */
  @computed get ProjectAdminObject() {
    let projectAdminObject = {};
    Object.keys(this.DecodedJwt.sp.co).forEach(companyName => {
      Object.keys(this.DecodedJwt.sp.co[companyName].proj).forEach(projectName => {
        // they have the project admin "bit" if it's an odd number for the permission
        if((this.DecodedJwt.sp.co[companyName].proj[projectName] % 2) !== 0) {
          if(projectAdminObject[companyName] === undefined) {
            projectAdminObject[companyName] = [];
          }
          projectAdminObject[companyName].push(projectName);
        }
      });
    });
    return projectAdminObject;
  }

  /**
   * Is the token expired?
   * @returns {boolean}
   */
  @computed get IsExpired() {
    return this.DecodedJwt.exp <= Math.floor(this.LastCheck / 1000);
  }

  /**
   * Does the token expire within a certain period of time.
   * @param {Number} seconds
   * @returns {boolean}
   */
  expiresWithin(seconds) {
    return this.DecodedJwt.exp <= (Math.floor(this.LastCheck / 1000) + seconds);
  }
}

