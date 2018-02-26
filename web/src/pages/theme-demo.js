
import React, { Component } from 'react';
import navigation from '../navigation';
import Columns from 'grommet/components/Columns';
import {NotificationCard, TextCard, TabCard, Charts} from '../components/theme-demo';

import StandardPage from './standard';

export class ThemeDemo extends Component {

  render() {
    return (
      <StandardPage nav="project">
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

navigation.registerUrlMapping("/theme-demo", ThemeDemo);

