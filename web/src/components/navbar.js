
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
import * as CompanyService from '../slick-api/Company';
import CompanyIcon from 'grommet/components/icons/base/Organization';
import CompanySideBarComponent from '../sidebar/company';
import {observer, inject} from 'mobx-react';

function logout() {
  delete localStorage.token;
  delete localStorage.userName;
  delete localStorage.userFirstName;
  delete localStorage.userFamilyName;
  delete localStorage.userGender;
  delete localStorage.userPicture;
  window.location.reload();
}

/**
 * @property {UserState} props.UserState
 */
@inject("UserState") @observer
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: this.props.nav,
      companies: []
    };
    navigation.SidebarMappings.sort((a, b) => {
      if(a.order < b.order) { return -1; }
      if(a.order > b.order) { return 1; }
      return 0;
    });
    CompanyService.GetAvailableCompanySettings().then((response) => {
      if(response.data.Companies) {
        this.setState(() => {
          return {companies: response.data.Companies};
        });
      }
    });
    this.changeNavAction = this.changeNavAction.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
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
    const {UserState} = this.props;
    let link = {
      Name: document.title,
      Url: document.location.href.substring(document.location.protocol.length + document.location.host.length + 2),
      UIViewType: "favorite"
    };

    if(!UserState.User.UserPreferences.Favorites) {
      UserState.User.UserPreferences.Favorites = [];
    }
    UserState.User.UserPreferences.Favorites.push(link);
    UserState.submit();
  }

  setLandingPage(e) {
    e.preventDefault();
    const {UserState} = this.props;
    UserState.User.UserPreferences.HomeUrl = document.location.href.substring(document.location.protocol.length + document.location.host.length + 2)
    UserState.submit();
  }

  render() {
    let sidebar = null;
    let nav = this.state.nav;
    if(nav === "Company") {
      sidebar = <CompanySideBarComponent/>;
    } else {
      let sideBarIndex = findIndex(navigation.SidebarMappings, (entry) => { return entry.name === nav; });
      if(sideBarIndex >= 0) {
        sidebar = React.createElement(navigation.SidebarMappings[sideBarIndex].comp, {});
      }
    }
    let companyIcon = <SidebarIcon name="Company" icon={<CompanyIcon />} selected={this.state.nav === "Company"} onSelect={this.changeNavAction("Company")}/>;
    if(this.state.companies.length === 1 && this.state.companies[0].CustomIconUrl) {
      companyIcon = <SidebarIcon name="Company" icon={<Image src={this.state.companies[0].CustomIconUrl} style={{maxWidth: "24px"}}/>} selected={this.state.nav === "Company"} onSelect={this.changeNavAction("Company")}/>;
    }
    return (
      <Box full="vertical" direction="row">
        <Box full="vertical" className="slick-navbar">
          <Box align="center" colorIndex="brand-a"><Anchor className="slick-nav-logo-icon" path="/">S</Anchor></Box>
          {navigation.SidebarMappings.map((entry) => {
            return <SidebarIcon key={entry.name} selected={this.state.nav === entry.name} name={entry.name} icon={React.createElement(entry.icon, {})} onSelect={this.changeNavAction(entry.name)}/>
          }, this)}
          <Box flex="grow" colorIndex="brand-a" onClick={this.changeNavAction(this.props.nav)} />
          {companyIcon}
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
          <Box full="vertical" pad="small" colorIndex="grey-1-a" className="slick-sidebar">
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