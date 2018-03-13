
import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
import {observer, inject} from 'mobx-react';

function isLoggedIn() {
  return localStorage.token;
}


@inject('UserState', 'LoginState') @observer
export default class StandardPage extends Component {

  render() {
    let style = {};
    if(this.props.UserState.User.UserPreferences && this.props.UserState.User.UserPreferences.BackgroundUrl) {
      style["backgroundImage"] = 'url(' + this.props.UserState.User.UserPreferences.BackgroundUrl + ')';
    }
    if(this.props.LoginState.IsLoggedIn) {
      return (
        <Split style={style} flex="right" className="slick-standard-page">
          <Navbar nav={this.props.nav}/>
          <Box full="vertical" pad="small" className="slick-standard-page-content">
            {this.props.children}
          </Box>
        </Split>
      );
    } else {
      return (<Redirect to="/login"/>);
    }
  }
}

StandardPage.propTypes = {
  nav: PropTypes.string.isRequired
};
