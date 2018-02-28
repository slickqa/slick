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
  }

  render() {
    return (
      <StandardPage nav="User">
        <Heading><User size="medium"/> Lee Higginson</Heading>
        <Box pad="small">
          <Image size="small"
                 src="https://s.gravatar.com/avatar/ba09e4305db32e5d791c29d8ccd2a36c"
          />
        </Box>
        <Box colorIndex="grey-2-a">
          <Accordion active={0} openMulti={true}>
            <AccordionPanel true heading="Basic Info">

              <Form plain={true}>
                <Columns masonry={true} maxCount={8}>
                  <FormField label="First Name" htmlFor="firstname">
                    <TextInput id="firstname" value="Lee"/>
                  </FormField>
                  <FormField label="Last Name" htmlFor="lastname">
                    <TextInput id="lastname" value="Higginson"/>
                  </FormField>
                  <FormField label="Email" htmlFor="email">
                    <TextInput id="email" value="leeard@gmail.com"/>
                  </FormField>
                  <FormField label="Title" htmlFor="title">
                    <TextInput id="title" value="Automation Engineer"/>
                  </FormField>
                  <FormField label="Photo URL" htmlFor="photourl">
                    <TextInput id="photourl" value="https://s.gravatar.com/avatar/ba09e4305db32e5d791c29d8ccd2a36c"/>
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
