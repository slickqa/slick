import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Title from 'grommet/components/Title';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import CloseIcon from 'grommet/components/icons/base/Close';
import AddIcon from 'grommet/components/icons/base/Add';
import StandardPage from './standard';
import navigation from '../navigation';
import {EmbeddedLinkItemView, LinkItem} from "../components/LinkView";
import {GetLinks} from "../slick-api/Links";
import {inject, observer} from 'mobx-react';
import {observable} from "mobx";
import qs from 'query-string';
import * as Permissions from '../permissions';
import EditLink from "../components/EditLink";

@inject('ProjectsState', 'LoginState') @observer
export class ProjectPage extends Component {
  @observable links = [];

  @observable add = {
    link: false,
    attribute: false
  };

  constructor(props) {
    super(props);
    this.refreshLinks = this.refreshLinks.bind(this);
  }

  componentDidMount() {
    this.refreshLinks();
  }

  refreshLinks() {
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
    let { ProjectsState, LoginState } = this.props;
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
      Attributes: {},
      LastUpdated: new Date()
      };
    }
    let content = null;
    let query = qs.parse(this.props.location.search);
    if(query.view) {
      let link = this.links.find((possible) => {return possible.Id.Name === query.view});
      if(link) {
        content = <Box colorIndex="grey-1-a" pad="small" margin={{vertical: "small"}}>
          <Box separator="bottom">
            <Heading margin="none">Project {projectParam} for Company {companyParam}</Heading>
          </Box>
          <Heading margin="none" tag="h2">{link.Id.Name}</Heading>
          <Box>
            <EmbeddedLinkItemView link={link}/>
          </Box>
          <Button icon={<CloseIcon/>} onClick={this.props.history.goBack} primary={true} label="Close"/>
        </Box>;
      } else {
            // not found?
      }
    } else {
      let addLink = null;
      if(LoginState.hasPermission(companyParam, projectParam, Permissions.ADMIN)) {
        if(!this.add.link) {
          addLink = <Box pad={{vertical: "small", horizontal: "medium"}} direction="row">
            <Button icon={<AddIcon/>} primary={true} onClick={() => {
              this.add.link = true;
            }}/>
          </Box>;

        } else {
          addLink =
            <Box pad={{vertical: "small", horizontal: "medium"}}>
              <EditLink addNew={true} link={{Id: {Company: companyParam, Project: projectParam, EntityType: "Project", EntityId: projectParam}}} onDone={() => {this.add.link = false; this.refreshLinks();}}/>
            </Box>;
        }
      }
      content = <Box>
        <Box colorIndex="grey-1-a" pad="small" margin={{vertical: "small"}}><Heading margin="none">Project {projectParam} for Company {companyParam}</Heading></Box>
        <Tiles fill={true}>
          <Tile>
            <Box colorIndex="grey-1-a" pad="small" margin="small" size="large">
              <Title>Links, Documents, and Files</Title>
              <Box>
                <List>
                  {this.links.map((link) => {
                    return <ListItem key={link.Id.Name}><LinkItem link={link} onClick={this.onSelectLinkItem.bind(this, link.Id.Name)}/></ListItem>;
                  })}
                </List>
                {addLink}
              </Box>
            </Box>
          </Tile>
          <Tile>
            <Box colorIndex="grey-1-a" pad="small" margin="small" size="large">
              <Title>Custom Attributes</Title>
            </Box>
          </Tile>
        </Tiles>
      </Box>;
    }

    return (
      <StandardPage nav="Projects">
        {content}
      </StandardPage>
    );
  }

  onSelectLinkItem(itemName) {
    // if link is not external
    this.props.history.push({
      path: this.props.location.path,
      search: qs.stringify({view: itemName})
    })
  }

}

navigation.registerUrlMapping("/projects/:company/:project", ProjectPage);
