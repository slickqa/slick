
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
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Projects</Heading>
        </Box>
        <Box>
          {Object.keys(ProjectsState.companiesTree).map((companyName) => {
            return (
              <Box key={companyName}>
                <Heading tag="h4" margin="none">{companyName}</Heading>
                  {(ProjectsState.companiesTree[companyName]).map(project => {
                    return (
                      <Box key={companyName + "-" + project.Id.Name} pad={{horizontal: "small"}} colorIndex={ProjectsState.current.Company === companyName && ProjectsState.current.Name === project.Id.Name ? 'brand-a' : null}>
                        <Anchor label={project.Id.Name} path={"/projects/" + project.Id.Company + "/" + project.Id.Name} />
                      </Box>
                    );
                  })}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}

navigation.registerSidebarMapping("Projects", 100, ProjectIcon, ProjectSideBarComponent);

