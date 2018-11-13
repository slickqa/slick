import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { set, observable } from 'mobx';
import Heading from 'grommet/components/Heading';
import Columns from 'grommet/components/Columns';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import CheckBox from 'grommet/components/CheckBox';
import Card from 'grommet/components/Card';
import Label from 'grommet/components/Label';
import Paragraph from 'grommet/components/Paragraph';
import Accordian from 'grommet/components/Accordion';
import AccordianPanel from 'grommet/components/AccordionPanel';
import StandardPage from './standard';
import navigation from '../navigation';
import UnknownIcon from 'grommet/components/icons/base/Help';
import IdleIcon from 'grommet/components/icons/base/Clock';
import RunningIcon from 'grommet/components/icons/base/Play';
import PausedIcon from 'grommet/components/icons/base/Pause';
import Animate from 'grommet/components/Animate';
import * as AgentsApi from '../slick-api/Agents';

/**
 * @property {UserState} props.UserState
 */
@inject("AgentsState") @observer
export class AgentsPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let companyParam = this.props.match.params.company;
    let AgentsState = this.props.AgentsState;
    AgentsState.currentCompany = companyParam;
  }

  render() {
    const { AgentsState } = this.props;
    let agentList = null;
    let agentMap = AgentsState.agentsByName[AgentsState.currentCompany];
    if(agentMap) {
      let agentNames = Object.keys(agentMap);
      agentNames.sort();
      agentList = agentNames.map((name) => {
        let agent = agentMap[name];
        if(agent.status) {
          let link = null;
          let agentImage = "/img/agent-default.jpg";
          if (agent.Image) {
            agentImage = agent.Image;
          }
          if (agent.status && agent.status.CurrentTest) {
            link = <Anchor target="_blank" href={agent.status.CurrentTest.Url} label={<Label size="small"
                                                                                             className="agent-running-url">{agent.status.CurrentTest.Name}</Label>}/>;

          }
          let heading = <Box direction="row">
            <Box className="agent-header" tag="div">{agent.Id.Name}</Box>
            <Box onClick={() => {AgentsApi.SetAgentRunStatus(agent.Id.Company, agent.Id.Name, {RunStatus: agent.status.RunStatus === "PAUSED" ? "IDLE" : "PAUSED"})}} >
              <Box pad={{vertical: "small"}}><PausedIcon colorIndex={agent.status.RunStatus === "PAUSED" ? "accent-3" : "neutral-4"}/></Box>
            </Box>
          </Box>;
                    let description = <Box>
                      <Box direction="row">
                        <Box>Current Status:</Box><Box pad={{"horizontal": "small"}}>{agent.status.RunStatus}</Box>
                      </Box>
                    </Box>;
          return <Card key={agent.Id.Name} thumbnail={<Image className="agent-thumbnail" src={agentImage}/>} description={description}
                       heading={heading} margin="small" colorIndex="grey-1-a" link={link}/>;
        }
        return null;
      });
    }
    return (
      <StandardPage nav="Agents">
        <Box direction="row" wrap={true}>
          {agentList}
        </Box>
      </StandardPage>
    );
  }

  componentWillUnmount() {
    let AgentsState = this.props.AgentsState;
    AgentsState.currentCompany = "";
  }
}

navigation.registerUrlMapping("/agents/:company", AgentsPage);
