import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import PlatformGoogleIcon from 'grommet/components/icons/base/PlatformGoogle';
import SlickLogo from '../components/slick-logo';
import navigation from '../navigation';
import VersionApi from "../../slick-client/src/api/VersionApi";

export class SlickFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VersionString: "Version Unknown"
    };
    this.vapi = new VersionApi();
    this.vapi.apiClient.basePath = window.location.protocol + "//" + window.location.host;
    this.vapi.getFullVersion(function (error, data, response) {
      this.setState(function () {
        return {VersionString: "Version " + data.Version};
      });
    }.bind(this));
  }

  render() {
    return <Footer pad="small">{this.state.VersionString}</Footer>;
  }
}

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.videos = [
      "hallstatt.mov",
      "lake2.mov",
      "lake.mov",
      "waterfall2.mov",
      "waterfall.mov",
      "paris.mov"
    ]
  }

  render() {
    return (
      <Box full="vertical" className="LoginPage">
        <video autoPlay muted loop id="background-video">
          <source src={"/img/" + this.videos[Math.floor(Math.random() * this.videos.length)]} type="video/mp4"/>
        </video>
        <Box flex="grow" justify="center" className="LoginPageLogo">
          <Box alignSelf="center" align="center">
            <Box align="center">
              <SlickLogo size="xlarge"/>
            </Box>
            <Box className="login-page-description" align="right">
              Test Management
            </Box>
            <Button icon={<PlatformGoogleIcon/>} href="/login/google" label="Login with Google"/>
          </Box>
        </Box>
        <SlickFooter/>
      </Box>
    );
  }
}


navigation.registerUrlMapping("/login", LoginPage);
