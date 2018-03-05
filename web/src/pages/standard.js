
import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";
import BrowserStorage from '../BrowserStorage';

function isLoggedIn() {
  return localStorage.token;
}


export default class StandardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: ""
    };

    if(BrowserStorage.User.UserPreferences && BrowserStorage.User.UserPreferences.BackgroundUrl) {
      this.state.background = BrowserStorage.User.UserPreferences.BackgroundUrl;
    }

    BrowserStorage.onUpdateUserInfo((userinfo) => {
      if(userinfo.UserPreferences && userinfo.UserPreferences.BackgroundUrl) {
        this.setState(() => {
          return {background: userinfo.UserPreferences.BackgroundUrl};
        });
      }
    });
  }

  render() {
    let style = {};
    if(this.state.background) {
      style["backgroundImage"] = 'url(' + this.state.background + ')';
    }
    if(isLoggedIn()) {
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
