
import * as User from './slick-api/Users';
import remove from 'lodash/remove';

export class BrowserStorage {
  constructor() {
    this.userUpdateCallbacks = [];
  }

  /**
   * @return {slickqaUserInfo}
   */
  get User() {
    if(localStorage.user) {
      return JSON.parse(localStorage.user);
    } else {
      return {};
    }
  }

  /**
   * @return {string}
   */
  get Token() {
    return localStorage.token;
  }

  onUpdateUserInfo(callback) {
    this.userUpdateCallbacks.push(callback);
  }

  removeOnUpdateUserInfo(callback) {
    remove(this.userUpdateCallbacks, (value) => { return value === callback });
  }

  /**
   *
   * @param {slickqaUserInfo} userInfo
   * @return {Promise<HttpResponse<slickqaUserInfo>>}
   */
  updateUserInfo(userInfo) {
    return User.UpdateUser(userInfo.EmailAddress, userInfo).then((response) => {
      if(response.raw.ok) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      this.userUpdateCallbacks.forEach((callback) => {
        callback(response.data);
      });
      return response;
    });
  }

}

let browserStorageSingleton = new BrowserStorage();
export default browserStorageSingleton;