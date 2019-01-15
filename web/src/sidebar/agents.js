
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Value from 'grommet/components/Value';
import PausedIcon from 'grommet/components/icons/base/Pause';
import UnPauseIcon from 'grommet/components/icons/base/Play';
import {inject, observer} from 'mobx-react';
import navigation from '../navigation';
import * as AgentsApi from '../slick-api/Agents';

export class AgentCounts extends Component {
  render() {
    let stats = this.props["stats"];
    let size = this.props["size"];
    if (!size) {
      size = "medium";
    }
    return <Box direction="row">
      <Box margin={{right: "small", vertical: "small"}}><Value size={size} value={stats.Total} label="Total" /></Box>
      <Box pad="small"><Value size={size} value={stats.RUNNING ? stats.RUNNING : 0} label="Running" colorIndex="neutral-3"/></Box>
      <Box pad="small"><Value size={size} value={stats.IDLE ? stats.IDLE : 0} label="Idle" colorIndex="neutral-4"/></Box>
      <Box pad="small"><Value size={size} value={stats.PAUSED ? stats.PAUSED : 0} label="Paused" colorIndex="accent-3"/></Box>
    </Box>;
  }
}

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
            let groups = Object.keys(AgentsState.agentsByGroup[companyName]).sort().map((groupName) => {
              return <Box key={companyName + "-" + groupName} margin={{vertical: "small"}}>
                <Box separator="bottom" margin={{left: "small"}}>
                  <Title style={{fontWeight: "normal", fontSize: "130%"}}>{groupName}</Title>
                  <AgentCounts size="small" stats={AgentsState.statsForGroup(companyName, groupName)}/>
                </Box>
              </Box>;
            });
            return <Box key={companyName} pad="small" >
                {companyHeader}
                <AgentCounts stats={companyStats}/>
              <Box margin={{"bottom": "small"}}>
                { companyStats.Total != companyStats.PAUSED ? <Button icon={<PausedIcon colorIndex="accent-3"/>} secondary={true} label="Pause All" onClick={this.changeRunStatusForCompany.bind(this, companyName, "PAUSED")}></Button> : null }
                { companyStats.PAUSED > 0 ? <Button icon={<UnPauseIcon colorIndex="neutral-3"/>} secondary={true} label="UnPause All" onClick={this.changeRunStatusForCompany.bind(this, companyName, "IDLE")}></Button> : null }
              </Box>
                {groups}
            </Box>;
          })}
        </Box>
      </Box>
    );
  }

  changeRunStatusForCompany(company, status) {
    let { AgentsState } = this.props;
    let agentMap = AgentsState.agentsByName[company];
    Object.keys(agentMap).forEach((agentName) => {
      AgentsApi.SetAgentRunStatus(company, agentName, {RunStatus: status})
    })
  }

  componentWillUnmount() {
    let { AgentsState } = this.props;
    AgentsState.pollForUpdates = false;
  }

}


