
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import ProjectIcon from 'grommet/components/icons/base/Technology';
import {inject, observer} from 'mobx-react';
import navigation from '../navigation';

@inject('LoginState') @observer
export default class AgentsSideBarComponent extends Component {

  componentDidMount() {
  }

  render() {
    let { LoginState } = this.props;
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Automation Agents</Heading>
        </Box>
        <Box>
        </Box>
      </Box>
    );
  }
}


