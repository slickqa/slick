import React, { Component } from 'react';

import PropTypes from 'prop-types';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import PlatformGoogleIcon from 'grommet/components/icons/base/PlatformGoogle';
import Spinning from 'grommet/components/icons/Spinning';
import Footer from 'grommet/components/Footer';
import Card from 'grommet/components/Card';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Accordian from 'grommet/components/Accordion';
import AccordianPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Select from 'grommet/components/Select';
import UsersApi from 'slick-client/src/api/UsersApi';
import VersionApi from 'slick-client/src/api/VersionApi';

function isLoggedIn() {
    return localStorage.token;
}

export class SlickFooter extends Component {
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
    return <Footer pad="small">{this.state.VersionString}</Footer>;
  }
}


export class SlickLogo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let className = "slick-logo-xlarge";
    if(this.props.size) {
      className = "slick-logo-" + this.props.size;
    }
    return <Title className={className}>S<span style={{"fontSize": "70%"}}>LICK</span></Title>;
  }
}

SlickLogo.propTypes = {
  size: PropTypes.oneOf(["xlarge", "medium"])
};

export class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Box full="vertical" className="LoginPage">
          <Box flex="grow" justify="center" className="LoginPageLogo">
            <Box alignSelf="center" align="center">
              <Box align="center">
                <SlickLogo size="xlarge"/>
              </Box>
              <Button icon={<PlatformGoogleIcon/>} href="/login/google" label="Login with Google"/>
            </Box>
          </Box>
          <SlickFooter/>
        </Box>
    );
  }
}

function logout() {
  delete localStorage.token;
  delete localStorage.userName;
  delete localStorage.userFirstName;
  delete localStorage.userFamilyName;
  delete localStorage.userGender;
  delete localStorage.userPicture;
  window.location.reload();
}


export class UserInfo extends Component {
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
    return user;
  }
}


export class SlickHeader extends Component {
  render() {
    return <Header className="slick-header" pad="small" colorIndex="brand">
      <SlickLogo size="medium"/>
      <Box flex="grow"> </Box>
      {this.props.children}
      <Button onClick={logout} label="Logout" />
    </Header>;
  }
}

export class ThemeDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: "Light"
    };
    this.changeBackground = this.changeBackground.bind(this);
  }

  changeBackground(opts) {
    this.setState(function() {
      return {background: opts.option};
    });
  }

  render() {
    let colorIndex="light-1";
    if(this.state.background === "Dark") {
      colorIndex="grey-1";
    } else if(this.state.background === "Light") {
      colorIndex="light-1";
    }
    return <Box full={true} colorIndex={colorIndex}>
      <SlickHeader>
        <Select options={["Light", "Dark"]} value={this.state.background} onChange={this.changeBackground} />
      </SlickHeader>
      <Box flex="grow" pad="small">
        <UserInfo/>
      </Box>
      <SlickFooter/>
    </Box>;
  }
}



export default class BasicApp extends Component {
  render() {
    let page = <LoginPage/>;
    if(isLoggedIn()) {
      page = <ThemeDemo/>;
    }
    return (
      <App centered={false}>
        {page}
      </App>
    );
  }
}
