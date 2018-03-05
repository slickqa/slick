import React, {Component} from 'react';
import Heading from 'grommet/components/Heading';
import Columns from 'grommet/components/Columns';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import {NotificationCard, TextCard, TabCard, Charts} from '../components/theme-demo';
import StandardPage from './standard';
import navigation from '../navigation';
import User from 'grommet/components/icons/base/User';
import Animate from 'grommet/components/Animate';
import BrowserStorage from '../BrowserStorage';
import cloneDeep from 'lodash/cloneDeep';

export class UserSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false,
      user: BrowserStorage.User
    };
    this.onUserValueChange = this.onUserValueChange.bind(this);
    this.onBasicInfoSubmit = this.onBasicInfoSubmit.bind(this);
    this.onThemeChange = this.onThemeChange.bind(this);
    window.BrowserStorage = BrowserStorage;
    window.cloneDeep = cloneDeep;
  }

  onUserValueChange(event) {
    let fieldName = event.target.id;
    let fieldValue = event.target.value;
    this.setState((old) => {
      let blah = cloneDeep(old);
      blah.user[fieldName] = fieldValue;
      blah.dirty = true;
      return blah;
    });
  }

  onThemeChange(event) {
    let fieldValue = event.target.innerText;
    let yomama = cloneDeep(this.state.user);
    yomama.UserPreferences.Theme = fieldValue;
    BrowserStorage.updateUserInfo(yomama).then((response) => {
     this.setState(() => {
       return {user: response.data}
     })
    })
  }

  onBasicInfoSubmit(event) {
    event.preventDefault();
    let that = this;
    BrowserStorage.updateUserInfo(this.state.user).then((response) => {
      console.log(response);
      that.setState(() => {
        return {user: response.data, dirty: false};
      })
    })
  }

  render() {
    return (
      <StandardPage nav="User">
        <Heading><User size="medium"/> {this.state.user.FullName}</Heading>
        <Box pad="small">
          <Image size="small"
                 src={this.state.user.AvatarUrl}
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
              return (
              <Anchor
                className='active'
                onClick={this.onThemeChange}>
                {theme}
              </Anchor>
              );

            })}
          </Menu>

        </Columns>
        <Columns>
          <Box colorIndex="grey-1-a">

            <Form plain={true} onSubmit={this.onBasicInfoSubmit}>
              <FormField label="First Name" htmlFor="firstname">
                <TextInput id="GivenName" onDOMChange={this.onUserValueChange} value={this.state.user.GivenName}/>
              </FormField>
              <FormField label="Last Name" htmlFor="lastname">
                <TextInput id="FamilyName" onDOMChange={this.onUserValueChange} value={this.state.user.FamilyName}/>
              </FormField>
              <FormField label="Email (can't change)" htmlFor="EmailAddress">
                <TextInput id="EmailAddress" value={this.state.user.EmailAddress}/>
              </FormField>
              <FormField label="Avatar URL" htmlFor="avatarurl">
                <TextInput id="AvatarUrl" onDOMChange={this.onUserValueChange} value={this.state.user.AvatarUrl}/>
              </FormField>
              <FormField label="Job Title" htmlFor="JobTitle">
                <TextInput id="JobTitle" onDOMChange={this.onUserValueChange} value={this.state.user.JobTitle}/>
              </FormField>
              <Box pad="small" align="center">
                <Animate visible={this.state.dirty} keep={true}>
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
