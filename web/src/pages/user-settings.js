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

export class UserSettingsPage extends Component {
  constructor(props) {
    super(props);
    this.user = JSON.parse(localStorage.user);
  }

  render() {
    return (
      <StandardPage nav="User">
        <Heading><User size="medium"/> {this.user.FullName}</Heading>
        <Box pad="small">
          <Image size="small"
                 src={this.user.AvatarUrl}
          />
        </Box>
        <Box colorIndex="grey-2-a">
          <Accordion active={0} openMulti={true}>
            <AccordionPanel true heading="Basic Info">

              <Form plain={true}>
                <Columns masonry={true} maxCount={8}>
                  <FormField label="First Name" htmlFor="firstname">
                    <TextInput id="firstname" value={this.user.GivenName}/>
                  </FormField>
                  <FormField label="Last Name" htmlFor="lastname">
                    <TextInput id="lastname" value={this.user.FamilyName}/>
                  </FormField>
                  <FormField label="Email" htmlFor="email">
                    <TextInput id="email" value={this.user.EmailAddress}/>
                  </FormField>
                  <FormField label="Avatar URL" htmlFor="avatarurl">
                    <TextInput id="avitarurl" value={this.user.AvatarUrl}/>
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
