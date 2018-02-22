
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SearchInput from 'grommet/components/SearchInput';
import TextInput from 'grommet/components/TextInput';
import RadioButton from 'grommet/components/RadioButton';
import NumberInput from 'grommet/components/NumberInput';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import DateTime from 'grommet/components/DateTime';
import CheckBox from 'grommet/components/CheckBox';
import Card from 'grommet/components/Card';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import TableHeader from 'grommet/components/TableHeader';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Tip from 'grommet/components/Tip';
import FilterControl from 'grommet-addons/components/FilterControl';
import Toast from 'grommet/components/Toast';
import Notification from 'grommet/components/Notification';
import Anchor from 'grommet/components/Anchor';
import Markdown from 'grommet/components/Markdown';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Spinning from 'grommet/components/icons/Spinning';
import SocialShare from 'grommet/components/SocialShare';
import Box from 'grommet/components/Box';
import Pulse from 'grommet/components/icons/Pulse';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Columns from 'grommet/components/Columns';

export class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: false
    };
    this.changeToastState = this.changeToastState.bind(this);
  }

  changeToastState() {
    this.setState(function(oldstate) {
      return {toast: !oldstate.toast};
    })
  }

  render() {
    let toast=null;
    if(this.state.toast) {
      toast=<Toast status="ok" onClose={this.changeToastState}>A Toast Message</Toast>;
    }
    return (
      <Card heading="Notifications" className="slick-card" margin="small">
        <Notification status="ok" size="medium" margin="small" message="Ok" />
        <Notification status="critical" size="medium" margin="small" message="Critical" />
        <Notification status="warning" size="medium" margin="small" message="Warning"/>
        <Notification status="disabled" size="medium" margin="small" message="Disabled"/>
        <Notification status="unknown" size="medium" margin="small" message="Unknown"/>
        <Button label="Show Toast Notification" onClick={this.changeToastState}/>
        {toast}
      </Card>
    );
  }
}

export class TextCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTip: false
    };
    this.changeTipState = this.changeTipState.bind(this);
  }

  changeTipState() {
    this.setState(function(oldstate) {
      return {showTip: !oldstate.showTip};
    })
  }

  render() {
    let tip = null;
    if(this.state.showTip) {
      tip = <Tip target="has-a-tip" onClose={this.changeTipState}>This is the tip</Tip>;
    }
    return (
      <Card heading="Text and Form Components" className="slick-card" margin="small">
        <Markdown content="Markdown text can also be rendered, including [a link to google](https://www.google.com)" />
        <Anchor label="An Anchor" />
        <FilterControl unfilteredTotal={100}
                        filteredTotal={50} />
        <span id="has-a-tip" onMouseEnter={this.changeTipState} onMouseLeave={this.changeTipState}>This text has a tip</span>
        {tip}
        <FormField label="Checkboxes">
          <CheckBox label='Simple Checkbox' onChange={()=>{}}/>
          <CheckBox label='Checkbox as a Toggle' toggle={true} checked={true} onChange={()=>{}}/>
        </FormField>
        <FormField label="Input Fields">
          <DateTime name="datetime" onChange={() => {}} />
          <NumberInput name="number" value={10} onChange={() => {}} />
          <SearchInput placeHolder="Search"/>
          <TextInput placeHolder="Text Input"/>
        </FormField>
        <FormField label="Radio Buttons">
          <RadioButton id="r-1" label="First" checked={true} onChange={()=>{}}/>
          <RadioButton id="r-2" label="Second" checked={false} onChange={()=>{}}/>
        </FormField>
      </Card>
    );
  }
}

export class TabCard extends Component {
  render() {
    return (
      <Card heading="Tabs and Icons" className="slick-card" margin="small">
        <Tabs>
          <Tab title='List Items'>
            <List>
              <ListItem justify='between'
                        separator='horizontal'>
                <span>Alan</span>
                <span className='secondary'>happy</span>
              </ListItem>
              <ListItem justify='between'>
                <span>Chris</span>
                <span className='secondary'>cool</span>
              </ListItem>
              <ListItem justify='between'>
                <span>Eric</span>
                <span className='secondary'>odd</span>
              </ListItem>
            </List>
          </Tab>
          <Tab title='Table'>
            <Table>
              <TableHeader labels={['Name', 'Note']}
                           sortIndex={0}
                           sortAscending={true}
                           onSort={()=>{}} />
              <tbody>
              <TableRow>
                <td>
                  Alan
                </td>
                <td>
                  plays accordion
                </td>
              </TableRow>
              <TableRow>
                <td>
                  Chris
                </td>
                <td>
                  drops the mic
                </td>
              </TableRow>
              <TableRow>
                <td>
                  Tracy
                </td>
                <td>
                  travels the world
                </td>
              </TableRow>
              </tbody>
            </Table>
          </Tab>
        </Tabs>
        <FormField label="Icons">
          <Box pad="small">
            <div>Spinner <Spinning /></div>
            <div>Social Share <SocialShare type="facebook" link="https://demo.slickqa.com" /></div>
            <div>Pulse <Pulse/></div>
          </Box>
        </FormField>
      </Card>
    )
  }
}

export class Charts extends Component {
  render() {
    return (
      <Tabs>
        <Tab title="Annotated Meter">
          <Columns justify="center">
            <AnnotatedMeter legend={true}
                            size='small'
                            type='circle'
                            max={70}
                            series={[{"label": "Fail", "value": 20, "colorIndex": "graph-3"}, {"label": "Pass", "value": 50, "colorIndex": "graph-1"}]} />
            <AnnotatedMeter legend={true}
                            size='medium'
                            type='bar'
                            max={70}
                            series={[{"label": "Fail", "value": 20, "colorIndex": "graph-3"}, {"label": "Pass", "value": 50, "colorIndex": "graph-1"}]} />
          </Columns>
        </Tab>
      </Tabs>
    )
  }
}