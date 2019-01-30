import {observable, computed, action} from 'mobx';
import * as AuthService from '../slick-api/Auth';
import {init as ApiInit} from '../slick-api/gateway/index';

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
      if(this.expiresWithin(60)) {
        AuthService.RefreshToken().then(response => {
          if(response.raw.ok && response.data.Success) {
            localStorage.token = response.data.Token;
            localStorage.user = JSON.stringify(response.data.User);
            this.reload();
            ApiInit({
              url: window.location.protocol + "//" + window.location.host,
              fetchOptions: {
                headers: {
                  Authorization: 'Bearer ' + localStorage.token
                }
              }
            });
          }
        });
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
    return localStorage.token && typeof this.DecodedJwt.sp !== 'undefined' && !this.IsExpired;
  }

  /**
   * Does the user have a particular permission for a project.
   * @param company {string} Company Name
   * @param project {string} Project Name
   * @param permission {number} permission
   * @returns {boolean} true if they have the permission, false otherwise
   */
  hasPermission(company, project, permission) {
    if(!this.IsLoggedIn) {
      return false;
    }
    if(this.IsSlickAdmin || this.CompanyAdminList.includes(company)) {
      return true
    }
    if(typeof this.DecodedJwt.sp.co !== "undefined" &&
       this.DecodedJwt.sp.co.hasOwnProperty(company) &&
       typeof this.DecodedJwt.sp.co[company].proj !== "undefined" &&
       this.DecodedJwt.sp.co[company].proj.hasOwnProperty(project) &&
       ((this.DecodedJwt.sp.co[company].proj[project] % 2) === 0) ||
        ((this.DecodedJwt.sp.co[company].proj[project] & permission) > 0)) {
        return true;
    }
    return false;
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

  @computed get HasWriteAccessToResults() {
    if(!this.IsLoggedIn) {
      return false;
    }

    if(this.IsSlickAdmin || this.CompanyAdminList.length > 0) {
      return true;
    }
    let retval = false;
    Object.keys(this.DecodedJwt.sp.co).forEach((company) => {
      Object.keys(this.DecodedJwt.sp.co[company].proj).forEach((project) => {
        if((this.DecodedJwt.sp.co[company].proj[project] & 512) > 0) {
          retval = true;
        }
      });
    });
    return retval;
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

