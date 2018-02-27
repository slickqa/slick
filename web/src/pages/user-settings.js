import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Columns from 'grommet/components/Columns';
import {NotificationCard, TextCard, TabCard, Charts} from '../components/theme-demo';
import StandardPage from './standard';
import navigation from '../navigation';

export class UserSettingsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StandardPage nav="User">
        <Heading>User Settings Page</Heading>
        <Columns>
          <NotificationCard/>
          <TextCard/>
          <TabCard/>
        </Columns>
        <Charts/>
      </StandardPage>
    );
  }
}

navigation.registerUrlMapping("/user/settings", UserSettingsPage);
