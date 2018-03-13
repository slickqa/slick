import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import navigation from '../navigation';
import {inject} from 'mobx-react';


function isLoggedIn() {
  return localStorage.token;
}

@inject('UserState')
export class RootPage extends Component {
  render() {
    if(isLoggedIn()) {
      return <Redirect to={this.props.UserState.User.UserPreferences.HomeUrl}/>
    } else {
      return <Redirect to="/login"/>;
    }
  }
}

navigation.registerUrlMapping("/", RootPage);
