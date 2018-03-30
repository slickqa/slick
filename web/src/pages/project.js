import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Title from 'grommet/components/Title';
import StandardPage from './standard';
import navigation from '../navigation';
import {inject, observer} from 'mobx-react';

@inject('ProjectsState') @observer
export class ProjectPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.title = this.props.match.params.project + " Project";
  }

  render() {
    let { ProjectsState } = this.props;
    let companyParam = this.props.match.params.company;
    let projectParam = this.props.match.params.project;
    setTimeout(() => {ProjectsState.current = {Company: companyParam, Name: projectParam}}, 0);
    let project = ProjectsState.projects.find(potential => { return potential.Id.Company === companyParam && potential.Id.Name === projectParam});
    if(project === undefined) {
      project = {
        Id: {
          Company: companyParam,
          Name: projectParam
        },
        Links: [],
      AutomationTools: [],
      Tags: [],
      Attributes: [],
      LastUpdated: new Date()
      };
    }

    return (
      <StandardPage nav="Projects">
        <Box colorIndex="grey-1-a" pad="small" margin={{vertical: "small"}}><Heading margin="none">Project {projectParam} for Company {companyParam}</Heading></Box>
        <Tiles fill={true}>
          <Tile>
            <Box colorIndex="grey-1-a" pad="small" margin="small" size="large">
              <Title>Links, Documents, and Files</Title>
            </Box>
          </Tile>
          <Tile>
            <Box colorIndex="grey-1-a" pad="small" margin="small" size="large">
              <Title>Tags</Title>
            </Box>
          </Tile>
          <Tile>
            <Box colorIndex="grey-1-a" pad="small" margin="small" size="large">
              <Title>Custom Attributes</Title>
            </Box>
          </Tile>
          <Tile>
            <Box colorIndex="grey-1-a" pad="small" margin="small" size="large">
              <Title>Automation Tool Names</Title>
            </Box>
          </Tile>
        </Tiles>
      </StandardPage>
    );
  }
}

navigation.registerUrlMapping("/projects/:company/:project", ProjectPage);
