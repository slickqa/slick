import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import TestrunIcon from 'grommet/components/icons/base/BarChart';
import navigation from '../navigation';

export class TestrunSideBarComponent extends Component {
  render() {
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Testruns</Heading>
        </Box>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Testruns", 600, TestrunIcon, TestrunSideBarComponent);