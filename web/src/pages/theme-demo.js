
import React, { Component } from 'react';
import navigation from '../navigation';
import Columns from 'grommet/components/Columns';
import {NotificationCard, TextCard, TabCard, Charts} from '../components/theme-demo';

import StandardPage from './standard';

export function register() {
  navigation.registerUrlMapping("/theme-demo", ThemeDemo);
}

export class ThemeDemo extends Component {

  render() {
    return (
      <StandardPage>
          <Columns>
            <NotificationCard/>
            <TextCard/>
            <TabCard/>
          </Columns>
          <Charts/>
      </StandardPage>
    )
  }

}