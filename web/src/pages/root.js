import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import navigation from '../navigation';


function isLoggedIn() {
  return localStorage.token;
}

export class RootPage extends Component {
  render() {
    if(isLoggedIn()) {
      return <Redirect to="/user/settings"/>
    } else {
      return <Redirect to="/login"/>;
    }
  }
}

navigation.registerUrlMapping("/", RootPage);
