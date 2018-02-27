import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import TestplanIcon from 'grommet/components/icons/base/Task';
import navigation from '../navigation';

export class TestplanSideBarComponent extends Component {
  render() {
    return (
      <Box>
        <Heading tag="h3">Testplans</Heading>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Testplans", 500, TestplanIcon, TestplanSideBarComponent);