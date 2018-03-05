
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import ProjectIcon from 'grommet/components/icons/base/Technology';
import navigation from '../navigation';

export class ProjectSideBarComponent extends Component {
  render() {
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Projects for SlickQA</Heading>
        </Box>
          <Anchor label="Slick" path="/projects/SlickQA/Slick"/>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Projects", 100, ProjectIcon, ProjectSideBarComponent);

