
import { observable, reaction, toJS, action } from "mobx";
import * as UserApi from '../slick-api/Users';

export default class UserState {
  /**
   * @type {slickqaUserInfo}
   */
  @observable User = {};
  @observable Dirty = false;

  constructor() {
    this.reset();
    if(localStorage.user) {
      this.User = JSON.parse(localStorage.user);
    }
    reaction(() => toJS(this.User), () => {
      if(this.Dirty === false) {
        this.Dirty = true;
      }
    });
    window.UserState = this;
  }

  reset() {
    if(localStorage.token) {
      UserApi.GetCurrentUserInfo().then((response) => {
        this.User = response.data;
      });
    } else {
        this.User = {};
    }
    this.Dirty = false;
  }

  submit() {
    UserApi.UpdateUser(this.User.EmailAddress, this.User).then((response) => {
      if(response.raw.ok) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.reset();
      }
      return response;
    });
  }
}

