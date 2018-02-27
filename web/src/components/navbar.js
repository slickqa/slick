
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
import findIndex from 'lodash/findIndex';

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
    navigation.SidebarMappings.sort((a, b) => {
      if(a.order < b.order) { return -1; }
      if(a.order > b.order) { return 1; }
      return 0;
    });
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
    let nav = this.state.nav;
    let sideBarIndex = findIndex(navigation.SidebarMappings, (entry) => { return entry.name === nav; });
    if(sideBarIndex >= 0) {
      sidebar = <Box full="vertical" pad="small" colorIndex="grey-1-a">
        {React.createElement(navigation.SidebarMappings[sideBarIndex].comp, {})}
      </Box>
    }
    return (
      <Box full="vertical" direction="row">
        <Box full="vertical">
          <Box align="center" colorIndex="brand-a"><Anchor className="slick-nav-logo-icon" path="/">S</Anchor></Box>
          {navigation.SidebarMappings.map((entry) => {
            return <SidebarIcon key={entry.name} selected={this.state.nav === entry.name} name={entry.name} icon={React.createElement(entry.icon, {})} onSelect={this.changeNavAction(entry.name)}/>
          }, this)}
          <Box flex="grow" colorIndex="brand-a" onClick={this.changeNavAction(this.props.nav)} />
          <Box colorIndex={this.state.nav === "User" ? "grey-1-a" : "brand-a"}>
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