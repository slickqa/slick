
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import UserIcon from 'grommet/components/icons/base/User';
import UserSettingsIcon from 'grommet/components/icons/base/UserSettings';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import Anchor from 'grommet/components/Anchor';
import SidebarIcon from './SidebarIcon';
import navigation from '../navigation';
import PropTypes from "prop-types";

function logout() {
  delete localStorage.token;
  delete localStorage.userName;
  delete localStorage.userFirstName;
  delete localStorage.userFamilyName;
  delete localStorage.userGender;
  delete localStorage.userPicture;
  window.location.reload();
}

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: this.props.nav
    };
    this.changeNavAction = this.changeNavAction.bind(this);
  }

  changeNavAction(to) {
    let that = this;
    return () => {
      that.setState(() => {
        return {nav: to};
      })
    };
  }

  render() {
    let sidebar = null;
    if(this.state.nav in navigation.SidebarMapping) {
      sidebar = <Box full="vertical" pad="small" colorIndex="grey-1-a">
        {React.createElement(navigation.SidebarMapping[this.state.nav][1], {})}
      </Box>
    }
    return (
      <Box full="vertical" direction="row">
        <Box full="vertical">
          {Object.entries(navigation.SidebarMapping).map((entry) => {
            return <SidebarIcon selected={this.state.nav === entry[0]} name={entry[0]} icon={React.createElement(entry[1][0], {})} onSelect={this.changeNavAction(entry[0])}/>
          })}
          <Box flex="grow" colorIndex="neutral-5" onClick={this.changeNavAction(this.props.nav)} />
          <Box colorIndex={this.state.nav === "User" ? "grey-1-a" : "neutral-5"}>
            <Menu icon={<UserIcon/>}>
              <Anchor path="/user/settings" icon={<UserSettingsIcon/>}>Settings</Anchor>
              <Anchor onClick={logout} icon={<LogoutIcon/>}>Logout</Anchor>
            </Menu>
          </Box>
        </Box>
        {sidebar}
      </Box>
    );
  }
}

Navbar.propTypes = {
  nav: PropTypes.string.isRequired
};