
import React, {Component} from 'react';
import Heading from 'grommet/components/Heading';
import Columns from 'grommet/components/Columns';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import {NotificationCard, TextCard, TabCard, Charts} from '../components/theme-demo';
import StandardPage from './standard';
import navigation from '../navigation';
import User from 'grommet/components/icons/base/User';
import {inject, observer} from 'mobx-react';


/**
 * @property {UserState} props.UserState
 */
@inject("UserState") @observer
export class ThemeUserSettingsPage extends Component {

  componentWillMount(){
    document.title = "Theme Demo"
  }

  render() {
    const { UserState } = this.props;
    return (
      <StandardPage nav="User">
        <Columns>
          <Box colorIndex="grey-1-a">
            <Heading>
              <User size="medium"/> {UserState.User.FullName}
            </Heading>
          </Box>
        </Columns>
        <Box pad="small">
          <Image size="small"
                 src={UserState.User.AvatarUrl}
          />
        </Box>
        <Columns size="small">
          <Menu responsive={true}
                label='Change Theme'
                inline={false}
                primary={true}
                colorIndex="grey-1-a"
                size='medium'>

            {Object.keys(SlickThemes).map((theme) => {
              if(UserState.User.UserPreferences.Theme !== theme) {
                return (
                  <Anchor
                    className='active'
                    onClick={() => {UserState.User.UserPreferences.Theme = theme}}>
                    {theme}
                  </Anchor>
                );}

            })}
          </Menu>

        </Columns>
        <Columns>
          <Box colorIndex="grey-1-a">

            <Form plain={true} onSubmit={(e) => {e.preventDefault(); UserState.submit();}}>
              <FormField label="Current Theme" htmlFor="Theme">
                <TextInput value={UserState.User.UserPreferences.Theme}/>
              </FormField>
            </Form>
          </Box>
        </Columns>
        <Columns>
          <NotificationCard/>
          <TextCard/>
          <TabCard/>
          <Charts/>
        </Columns>
      </StandardPage>
    );
  }
}

navigation.registerUrlMapping("/theme-demo", ThemeUserSettingsPage);

