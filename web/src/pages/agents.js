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
        let link = null;
        let image = "/img/agent-default.jpg";
        if(agent.Image) {
          image = agent.Image;
        }
        if(agent.status && agent.status.CurrentTest) {
          link = <Anchor target="_blank" href={agent.status.CurrentTest.Url} label={<Label size="small" className="agent-running-url">{agent.status.CurrentTest.Name}</Label>} />;

        }
        let stateIcon = <UnknownIcon colorIndex="neutral-2"/>;
        if(agent.status && agent.status.RunStatus && agent.status.RunStatus === "IDLE") {
          stateIcon = <IdleIcon colorIndex="neutral-4"/>
        } else if(agent.status && agent.status.RunStatus && agent.status.RunStatus === "RUNNING") {
          stateIcon = <RunningIcon colorIndex="neutral-3"/>
        } else if(agent.status && agent.status.RunStatus && agent.status.RunStatus === "PAUSED") {
          stateIcon = <PausedIcon colorIndex="accent-3"/>
        }
        return <Card thumbnail={image} heading={<Heading tag="h2">{stateIcon} {agent.Id.Name}</Heading>} margin="small" colorIndex="grey-1-a" link={link}/>;
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
