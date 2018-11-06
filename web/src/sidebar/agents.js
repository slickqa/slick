
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import ProjectIcon from 'grommet/components/icons/base/Technology';
import {inject, observer} from 'mobx-react';
import navigation from '../navigation';

@inject('AgentsState') @inject('UserState') @observer
export default class AgentsSideBarComponent extends Component {

  componentDidMount() {
    let {UserState, AgentsState} = this.props;
    AgentsState.companies = UserState.User.Permissions.Companies.map((companyPermission) => {return companyPermission.CompanyName;});
    //TODO: Also get a list of companies from CompaniesState
    AgentsState.pollForUpdates = true;
  }

  render() {
    let { AgentsState } = this.props;
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Automation Agents</Heading>
        </Box>
        <Box>
          {Object.keys(AgentsState.statsForAgentsByCompany).map((companyName) => {
            let companyStats = AgentsState.statsForAgentsByCompany[companyName];
            return <Box key={companyName} separator="bottom" pad="small" >
              <Heading tag="h4" align="left">{companyName}</Heading>
              <Box pad={{horizontal: "small"}}>Total: {companyStats.Total}, Idle: {companyStats.IDLE ? companyStats.IDLE : 0}, Running: {companyStats.RUNNING ? companyStats.RUNNING : 0}</Box>

            </Box>;
          })}
        </Box>
      </Box>
    );
  }

  componentWillUnmount() {
    let { AgentsState } = this.props;
    AgentsState.pollForUpdates = false;
  }

}


