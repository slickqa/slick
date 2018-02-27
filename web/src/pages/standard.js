
import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";


function isLoggedIn() {
  return localStorage.token;
}


export default class StandardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(isLoggedIn()) {
      return (
        <Split flex="right" className="slick-standard-page">
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
