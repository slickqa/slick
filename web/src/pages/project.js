import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Title from 'grommet/components/Title';
import StandardPage from './standard';
import navigation from '../navigation';
import {EmbeddedLinkItemView, LinkItem} from "../components/LinkView";
import {GetLinks} from "../slick-api/Links";
import {inject, observer} from 'mobx-react';
import {observable} from "mobx";
import qs from 'query-string';

@inject('ProjectsState') @observer
export class ProjectPage extends Component {
  @observable links = [];

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let companyParam = this.props.match.params.company;
    let projectParam = this.props.match.params.project;
    document.title = this.props.match.params.project + " Project";
    GetLinks(companyParam, projectParam, "Project", projectParam).then((resp) => {
      if(resp.data.links) {
        this.links = resp.data.links;
      }
    });
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
    let query = qs.parse(this.props.location.search);

    let linksList = this.links.map((link) => {
      let item = <LinkItem link={link}/>;
      let show = null;

      if(query.view === link.Id.Name) {
        show = <EmbeddedLinkItemView link={link}/>
      }
      return <li key={link.Id.Name}>{item}{show}</li>;
    });


    return (
      <StandardPage nav="Projects">
        <Box colorIndex="grey-1-a" pad="small" margin={{vertical: "small"}}><Heading margin="none">Project {projectParam} for Company {companyParam}</Heading></Box>
        <Tiles fill={true}>
          <Tile>
            <Box colorIndex="grey-1-a" pad="small" margin="small" size="large">
              <Title>Links, Documents, and Files</Title>
              <Box>
                <ul>
                  {linksList}
                </ul>
              </Box>
            </Box>
          </Tile>
          <Tile>
            <Box colorIndex="grey-1-a" pad="small" margin="small" size="large">
              <Title>Custom Attributes</Title>
            </Box>
          </Tile>
        </Tiles>
      </StandardPage>
    );
  }
}

navigation.registerUrlMapping("/projects/:company/:project", ProjectPage);
