import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import TestcaseIcon from 'grommet/components/icons/base/Compliance';
import navigation from '../navigation';

export class TestcaseSideBarComponent extends Component {
  render() {
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Testcases</Heading>
        </Box>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Testcases", 400, TestcaseIcon, TestcaseSideBarComponent);