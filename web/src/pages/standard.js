
import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import {Redirect} from 'react-router-dom';


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
          <Navbar/>
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
