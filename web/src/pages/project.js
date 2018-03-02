import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import StandardPage from './standard';
import navigation from '../navigation';

export class ProjectPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentWillMount() {
    document.title = this.props.match.params.project + " Project";
  }

  render() {
    return (
      <StandardPage nav="Projects">
        <Heading>Project {this.props.match.params.project} for Company {this.props.match.params.company}</Heading>
      </StandardPage>
    );
  }
}

navigation.registerUrlMapping("/projects/:company/:project", ProjectPage);
