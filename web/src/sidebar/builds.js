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
        <Heading tag="h3">Builds</Heading>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Builds", 300, BuildIcon, BuildSideBarComponent);