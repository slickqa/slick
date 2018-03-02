
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
import BookmarkIcon from 'grommet/components/icons/base/Bookmark';
import HomeIcon from 'grommet/components/icons/base/Home';
import Animate from 'grommet/components/Animate';
import navigation from '../navigation';
import PropTypes from "prop-types";
import findIndex from 'lodash/findIndex';
import BrowserStorage from '../BrowserStorage';
import cloneDeep from 'lodash/cloneDeep';

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

  addToFavorites(e) {
    e.preventDefault();
    let link = {
      Name: document.title,
      Url: document.location.href.substring(document.location.protocol.length + document.location.host.length + 2),
      UIViewType: "favorite"
    };
    let user = cloneDeep(BrowserStorage.User);
    if(!user.UserPreferences.Favorites) {
      user.UserPreferences.Favorites = [];
    }
    user.UserPreferences.Favorites.push(link);
    BrowserStorage.updateUserInfo(user).then(() => {});
  }

  setLandingPage(e) {
    e.preventDefault();
    let user = cloneDeep(BrowserStorage.User);
    user.UserPreferences.HomeUrl = document.location.href.substring(document.location.protocol.length + document.location.host.length + 2)
    BrowserStorage.updateUserInfo(user).then(() => {});
  }

  render() {
    let sidebar = null;
    let nav = this.state.nav;
    let sideBarIndex = findIndex(navigation.SidebarMappings, (entry) => { return entry.name === nav; });
    if(sideBarIndex >= 0) {
      sidebar = React.createElement(navigation.SidebarMappings[sideBarIndex].comp, {});
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
              <Anchor onClick={this.addToFavorites} icon={<BookmarkIcon/>}>Add to Favorites</Anchor>
              <Anchor onClick={this.setLandingPage} icon={<HomeIcon/>}>Set Login Home</Anchor>
              <Anchor onClick={logout} icon={<LogoutIcon/>}>Logout</Anchor>
            </Menu>
          </Box>
        </Box>
        <Animate visible={sidebar !== null} enter={{"animation": "slide-right", "duration": 300}} keep={false}>
          <Box full="vertical" pad="small" colorIndex="grey-1-a">
            {sidebar}
          </Box>
        </Animate>
      </Box>
    );
  }
}

Navbar.propTypes = {
  nav: PropTypes.string.isRequired
};