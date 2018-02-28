import React, {Component} from 'react';
import Heading from 'grommet/components/Heading';
import Columns from 'grommet/components/Columns';
import Paragraph from 'grommet/components/Paragraph';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Label from 'grommet/components/Label';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import {NotificationCard, TextCard, TabCard, Charts} from '../components/theme-demo';
import StandardPage from './standard';
import navigation from '../navigation';
import User from 'grommet/components/icons/base/User';
import BrowserStorage from '../BrowserStorage';
import cloneDeep from 'lodash/cloneDeep';

export class UserSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.browserStorage = new BrowserStorage();
    this.state = {
      user: this.browserStorage.User
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onBasicInfoSubmit = this.onBasicInfoSubmit.bind(this);
  }

  onValueChange(event) {
    let fieldName = event.target.id;
    let fieldValue = event.target.value;
    this.setState((old) => {
      let blah = cloneDeep(old);
      blah.user[fieldName] = fieldValue;
      return blah;
    });
  }

  onBasicInfoSubmit(event) {
    event.preventDefault();
    let that = this;
    this.browserStorage.updateUserInfo(this.state.user).then((response) => {
      console.log(response);
      that.setState(() => {
        return {user: response.data};
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
        <Box colorIndex="grey-2-a">
          <Accordion active={0} openMulti={true}>
            <AccordionPanel true heading="Basic Info">

              <Form plain={true} onSubmit={this.onBasicInfoSubmit}>
                <Columns masonry={true} maxCount={8}>
                  <FormField label="First Name" htmlFor="firstname">
                    <TextInput id="GivenName" onDOMChange={this.onValueChange} value={this.state.user.GivenName}/>
                  </FormField>
                  <FormField label="Last Name" htmlFor="lastname">
                    <TextInput id="FamilyName" onDOMChange={this.onValueChange} value={this.state.user.FamilyName}/>
                  </FormField>
                  <FormField label="Email" htmlFor="email">
                    <TextInput id="EmailAddress" value={this.state.user.EmailAddress}/>
                  </FormField>
                  <FormField label="Avatar URL" htmlFor="avatarurl">
                    <TextInput id="AvatarUrl" onDOMChange={this.onValueChange} value={this.state.user.AvatarUrl}/>
                  </FormField>
                </Columns>
                <Box pad="small" align="center">
                  <Button label="Save" type="submit"/>
                </Box>
              </Form>
            </AccordionPanel>
            <AccordionPanel heading="Favorites">
              <Paragraph>
                List of favorites will go here
              </Paragraph>
            </AccordionPanel>
            <AccordionPanel heading='Slick Theme'>
              <Columns>
                <NotificationCard/>
                <TextCard/>
                <TabCard/>
              </Columns>
              <Charts/>
            </AccordionPanel>
          </Accordion>
        </Box>
      </StandardPage>
    );
  }
}

navigation.registerUrlMapping("/user/settings", UserSettingsPage);
