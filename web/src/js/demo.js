
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import PlatformGoogleIcon from 'grommet/components/icons/base/PlatformGoogle';
import Spinning from 'grommet/components/icons/Spinning';
import Footer from 'grommet/components/Footer';
import Card from 'grommet/components/Card';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Accordian from 'grommet/components/Accordion';
import AccordianPanel from 'grommet/components/AccordionPanel';
import Toast from 'grommet/components/Toast';
import Notification from 'grommet/components/Notification';

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
      <Card heading="Notifications" separator="all" margin="small">
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