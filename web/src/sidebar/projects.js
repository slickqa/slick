
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import ProjectIcon from 'grommet/components/icons/base/Technology';
import {inject, observer} from 'mobx-react';
import navigation from '../navigation';

@inject('ProjectsState') @observer
export class ProjectSideBarComponent extends Component {

  componentDidMount() {
    this.props.ProjectsState.load();
  }

  render() {
    let { ProjectsState } = this.props;
    let companiesTree = {};
    ProjectsState.projects.forEach(project => {
      if(!(project.Id.Company in companiesTree)) {
        companiesTree[project.Id.Company] = [];
      }
      (companiesTree[project.Id.Company]).push(project)
    });

    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Projects</Heading>
        </Box>
        <Box>
          {Object.keys(companiesTree).map((companyName) => {
            return (
              <Box key={companyName}>
                <Heading tag="h4" margin="none">{companyName}</Heading>
                <Box pad="small">
                  {(companiesTree[companyName]).map(project => {
                    return <Anchor label={project.Id.Name} path={"/projects/" + project.Id.Company + "/" + project.Id.Name} />;
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Projects", 100, ProjectIcon, ProjectSideBarComponent);

