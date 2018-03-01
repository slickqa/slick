
import * as User from './slick-api/Users';
import * as Auth from './slick-api/Auth';

export default class BrowserStorage {

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
      return response;
    });
  }

}