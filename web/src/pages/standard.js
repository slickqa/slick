
import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';


function isLoggedIn() {
  return localStorage.token;
}


export default class StandardPage extends Component {
  render() {
    if(isLoggedIn()) {
      return (
        <Split flex="right" className="slick-standard-page">
          <Navbar/>
          <Box className="slick-standard-page-content">
            {this.props.children}
          </Box>
        </Split>
      )
    } else {
    }
  }
}
