import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import BuildIcon from 'grommet/components/icons/base/Tasks';
import navigation from '../navigation';

export class BuildSideBarComponent extends Component {
  render() {
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Builds</Heading>
        </Box>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Builds", 300, BuildIcon, BuildSideBarComponent);