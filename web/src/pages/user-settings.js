import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { set, observable } from 'mobx';
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
import Card from 'grommet/components/Card';
import Label from 'grommet/components/Label';
import Paragraph from 'grommet/components/Paragraph';
import Accordian from 'grommet/components/Accordion';
import AccordianPanel from 'grommet/components/AccordionPanel';
import StandardPage from './standard';
import navigation from '../navigation';
import User from 'grommet/components/icons/base/User';
import Animate from 'grommet/components/Animate';

/**
 * @property {UserState} props.UserState
 */
@inject("UserState") @observer
export class UserSettingsPage extends Component {
  @observable editedFields = [];
  constructor(props) {
    super(props);
    this.props.UserState.reset();
  }

  fieldIsEdited(fieldName)
  {
    if(this.editedFields.indexOf(fieldName) > -1)
    {
      return('Edited')
    }
    return(NaN)
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
        <Columns >
          <Box colorIndex="grey-1-a">

            <Form plain={true} onSubmit={(e) => {e.preventDefault(); UserState.submit();}}>
              <FormField label="Current Theme" htmlFor="Theme">
                <TextInput value={UserState.User.UserPreferences.Theme}/>
              </FormField>
              <FormField label="First Name" htmlFor="firstname" error={this.fieldIsEdited('givenname')}>
                <TextInput id="GivenName" onDOMChange={(e) => {set(UserState.User, "GivenName", e.target.value); this.editedFields.push('givenname')}} value={UserState.User.GivenName}/>
              </FormField>
              <FormField label="Last Name" htmlFor="lastname" error={this.fieldIsEdited('lastname')}>
                <TextInput id="FamilyName" onDOMChange={(e) => {set(UserState.User, "FamilyName", e.target.value); this.editedFields.push('lastname')}} value={UserState.User.FamilyName}/>
              </FormField>
              <FormField label="Email (can't change)" htmlFor="EmailAddress">
                <TextInput id="EmailAddress" value={UserState.User.EmailAddress}/>
              </FormField>
              <FormField label="Avatar URL" htmlFor="avatarurl" error={this.fieldIsEdited('avatarurl')}>
                <TextInput id="AvatarUrl" onDOMChange={(e) => {set(UserState.User, "AvatarUrl", e.target.value); this.editedFields.push('avatarurl')}} value={UserState.User.AvatarUrl}/>
              </FormField>
              <FormField label="Job Title" htmlFor="JobTitle" error={this.fieldIsEdited('jobtitle')}>
                <TextInput id="JobTitle" onDOMChange={(e) => {set(UserState.User, "JobTitle", e.target.value); this.editedFields.push('jobtitle')}} value={UserState.User.JobTitle}/>
              </FormField>
              <FormField label="Background URL" htmlFor="BackgroundUrl" error={this.fieldIsEdited('backgroundurl')}>
                <TextInput id="BackgroundUrl" onDOMChange={(e) => {set(UserState.User.UserPreferences, "BackgroundUrl", e.target.value); this.editedFields.push('backgroundurl')}} value={UserState.User.UserPreferences.BackgroundUrl}/>
              </FormField>
              <Box pad="small" align="center">
                <Animate visible={this.editedFields.length > 0} keep={true}>
                  <Button label="Save" type="submit" onClick={() => {this.editedFields = []}}/>
                </Animate>
              </Box>
            </Form>
          </Box>
          {UserState.User.Permissions.Companies.map((company) => {
            return (
                <Box key={company.CompanyName} colorIndex="grey-1-a" margin='small'>
              <Card
                label='Company'
                heading={company.CompanyName}
                description="Permissions"
                contentPad='small'
              >
                  {company.Projects.map(((project) => {
                    return (
                      <Box key={project.ProjectName} pad='none' >
                      <Label size='large' margin='small' >{project.ProjectName}</Label>
                        <Box margin={'small'}>Roles: {project.Roles.join(', ')}</Box>
                      </Box>
                    );
                  }))}
              </Card>
              </Box>
            );
          })}
        </Columns>
      </StandardPage>
    );
  }
}

navigation.registerUrlMapping("/user/settings", UserSettingsPage);
