
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Value from 'grommet/components/Value';
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
            let companyHeader = <Heading tag="h4" margin="none"><Anchor path={"/agents/" + companyName}>{companyName}</Anchor></Heading>;
            if(companyName === AgentsState.currentCompany) {
              companyHeader = <Box colorIndex="brand-a">{companyHeader}</Box>;
            }
            return <Box key={companyName} separator="bottom" pad="small" >
                {companyHeader}
              <Box direction="row">
                <Box pad="small"><Value size="small" value={companyStats.Total} label="Total" /></Box>
                <Box pad="small"><Value size="small" value={companyStats.RUNNING ? companyStats.RUNNING : 0} label="Running" colorIndex="neutral-3"/></Box>
                <Box pad="small"><Value size="small" value={companyStats.IDLE ? companyStats.IDLE : 0} label="Idle" colorIndex="neutral-4"/></Box>
                <Box pad="small"><Value size="small" value={companyStats.PAUSED ? companyStats.PAUSED : 0} label="Paused" colorIndex="accent-3"/></Box>
              </Box>
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


