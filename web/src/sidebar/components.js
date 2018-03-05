import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import ComponentIcon from 'grommet/components/icons/base/Tree';
import navigation from '../navigation';

export class ComponentSideBarComponent extends Component {
  render() {
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Components</Heading>
        </Box>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Components", 200, ComponentIcon, ComponentSideBarComponent);