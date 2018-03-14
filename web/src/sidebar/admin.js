import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import AdminIcon from 'grommet/components/icons/base/License';
import navigation from '../navigation';

export default class AdminSideBarComponent extends Component {
  render() {
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Administration</Heading>
        </Box>
      </Box>
    );
  }
}

