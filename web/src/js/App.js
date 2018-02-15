import React, { Component } from 'react';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import PlatformGoogleIcon from 'grommet/components/icons/base/PlatformGoogle';
import Spinning from 'grommet/components/icons/Spinning';
import Card from 'grommet/components/Card';
import UsersApi from 'slick-client/src/api/UsersApi';

function isLoggedIn() {
    return localStorage.token;
}

export class SlickLogo extends Component {
  render() {
    return (
      <div>
        <Headline size={"xlarge"} style={{"fontFamily": "Audiowide, cursive"}}>S
          <span style={{"fontSize": "70%"}}>LICK</span>
        </Headline>
        <Headline size={"small"}>A Test Manager that doesn't suck!</Headline>
      </div>
    );
  }
}

export class LoginPage extends Component {
  render() {
    return (
      <Split flex="left">
        <Box justify="center" className="LoginPage" align="center"><SlickLogo/></Box>
        <Box justify="center" pad={{"horizontal": "small"}} full="vertical" align="center">
          <Button icon={<PlatformGoogleIcon/>} primary={true} href="/login/google" label="Login with Google"/>
        </Box>
      </Split>
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
      console.log(data);
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
              description="stuff" />;


    }
    return (
      <Box>
        <Headline size="large">Welcome {localStorage.userFirstName}</Headline>
        <Button onClick={this.handleClick} label="Logout" />
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
