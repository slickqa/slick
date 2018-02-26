
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import navigation from '../navigation';

export function register() {
  navigation.registerSidebarMapping("project", ProjectSideBarComponent);
}

export class ProjectSideBarComponent extends Component {
  render() {
    return (
      <Box>
        <Heading tag="h3">Projects for SlickQA</Heading>
          <Anchor label="Slick" path="/projects/SlickQA/Slick"/>
      </Box>
    );
  }
}