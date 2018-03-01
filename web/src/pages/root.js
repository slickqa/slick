import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import navigation from '../navigation';
import BrowserStorage from "../BrowserStorage";


function isLoggedIn() {
  return localStorage.token;
}

export class RootPage extends Component {
  render() {
    if(isLoggedIn()) {
      return <Redirect to={BrowserStorage.User.UserPreferences.HomeUrl}/>
    } else {
      return <Redirect to="/login"/>;
    }
  }
}

navigation.registerUrlMapping("/", RootPage);
