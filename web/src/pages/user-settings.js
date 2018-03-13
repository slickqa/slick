import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
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
import StandardPage from './standard';
import navigation from '../navigation';
import User from 'grommet/components/icons/base/User';
import Animate from 'grommet/components/Animate';

/**
 * @property {UserState} props.UserState
 */
@inject("UserState") @observer
export class UserSettingsPage extends Component {
  constructor(props) {
    super(props);
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
              if(UserState.User.UserPreferences.Theme !== theme){
              return (
                <Anchor
                  key={theme}
                  className='active'
                  onClick={() => {UserState.User.UserPreferences.Theme = theme;}}>
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
              <FormField label="First Name" htmlFor="firstname">
                <TextInput id="GivenName" onDOMChange={(e) => {UserState.User.GivenName = e.target.value}} value={UserState.User.GivenName}/>
              </FormField>
              <FormField label="Last Name" htmlFor="lastname">
                <TextInput id="FamilyName" onDOMChange={(e) => {UserState.User.FamilyName = e.target.value}} value={UserState.User.FamilyName}/>
              </FormField>
              <FormField label="Email (can't change)" htmlFor="EmailAddress">
                <TextInput id="EmailAddress" value={UserState.User.EmailAddress}/>
              </FormField>
              <FormField label="Avatar URL" htmlFor="avatarurl">
                <TextInput id="AvatarUrl" onDOMChange={(e) => {UserState.User.AvatarUrl = e.target.value}} value={UserState.User.AvatarUrl}/>
              </FormField>
              <FormField label="Job Title" htmlFor="JobTitle">
                <TextInput id="JobTitle" onDOMChange={(e) => {UserState.User.JobTitle = e.target.value}} value={UserState.User.JobTitle}/>
              </FormField>
              <FormField label="Background URL" htmlFor="BackgroundUrl">
                <TextInput id="BackgroundUrl" onDOMChange={(e) => {UserState.User.UserPreferences.BackgroundUrl = e.target.Value}} value={UserState.User.UserPreferences.BackgroundUrl}/>
              </FormField>
              <Box pad="small" align="center">
                <Animate visible={UserState.Dirty} keep={true}>
                  <Button label="Save" type="submit"/>
                </Animate>
              </Box>
            </Form>
          </Box>
        </Columns>
      </StandardPage>
    );
  }
}

navigation.registerUrlMapping("/user/settings", UserSettingsPage);
