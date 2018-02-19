import React, { Component } from 'react';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import PlatformGoogleIcon from 'grommet/components/icons/base/PlatformGoogle';
import Spinning from 'grommet/components/icons/Spinning';
import Footer from 'grommet/components/Footer';
import Card from 'grommet/components/Card';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Accordian from 'grommet/components/Accordion';
import AccordianPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import UsersApi from 'slick-client/src/api/UsersApi';
import VersionApi from 'slick-client/src/api/VersionApi';

function isLoggedIn() {
    return localStorage.token;
}

export class SlickLogo extends Component {
  render() {
    return (
      <Box align="center">
        <Headline size={"xlarge"} style={{"fontFamily": "Audiowide, cursive", "letter-spacing": "30px"}}>S
          <span style={{"fontSize": "70%"}}>LICK</span>
        </Headline>
        <Headline size={"small"}>A Test Manager that doesn't suck!</Headline>
      </Box>
    );
  }
}

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VersionString: "Version Unknown"
    };
    this.vapi = new VersionApi();
    this.vapi.apiClient.basePath = window.location.protocol + "//" + window.location.host;
    this.vapi.getFullVersion(function(error, data, response) {
      this.setState(function() {
        return {VersionString: "Version " + data.Version};
      });
    }.bind(this));
  }
  render() {
    return (
        <Box full="vertical" className="LoginPage">
          <Box justify="center" align="center" className="LoginPageLogo">
            <SlickLogo/>
            <Button icon={<PlatformGoogleIcon/>} href="/login/google" label="Login with Google"/>
          </Box>
          <Footer>{this.state.VersionString}</Footer>
        </Box>
    );
  }
}

export class UserInfoPage extends Component {
  constructor(props) {
    super(props);
    this.users = new UsersApi();
    this.users.apiClient.basePath = window.location.protocol + "//" + window.location.host;
    this.users.apiClient.defaultHeaders["Authorization"] = "Bearer " + localStorage.token;
    let that = this;
    this.users.getCurrentUserInfo(function(error, data, response) {
      that.setState(function () {
        return {"user": data};
      });
    });
    this.state = {
      "user": undefined
    };
    window.users = this.users;
  }

  handleClick(e) {
    e.preventDefault();
    delete localStorage.token;
    delete localStorage.userName;
    delete localStorage.userFirstName;
    delete localStorage.userFamilyName;
    delete localStorage.userGender;
    delete localStorage.userPicture;
    window.location.reload();
  }

  render() {
    let user = <Spinning />;
    if(this.state.user) {
      window.user = this.state.user;
      user =
        <Card thumbnail={this.state.user.AvatarUrl}
              heading={this.state.user.FullName}
              description="The following are the companies and roles you are assigned."
              separator="all">
          {this.state.user.Permissions.Companies.map(function(company) {
            return <Section key={company.CompanyName}>
              <Heading tag="h3">{company.CompanyName}</Heading>
              <Accordian openMulti={true}>
                {company.Projects.map(function(project) {
                  return <AccordianPanel key={project.ProjectName} heading={project.ProjectName}>
                    <Paragraph margin="small">Role{project.Roles.length > 1 ? "s" : ""}: {project.Roles.join(", ")}</Paragraph>
                  </AccordianPanel>;
                })}
              </Accordian>
            </Section>
          })}
        </Card>;


    }
    return (
      <Box full="vertical" pad="medium">
        <Headline size="large">Welcome {localStorage.userFirstName}</Headline>
        <Box margin={{vertical: "small"}}>
          <Button onClick={this.handleClick} primary={true} label="Logout" />
        </Box>
        {user}
      </Box>
    )
  }
}

export default class BasicApp extends Component {
  render() {
    let page = <LoginPage/>;
    if(isLoggedIn()) {
      page = <UserInfoPage/>;
    }
    return (
      <App centered={false}>
        {page}
      </App>
    );
  }
}
