
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Menu from 'grommet/components/Menu';
import UserIcon from 'grommet/components/icons/base/User';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import Anchor from 'grommet/components/Anchor';
import navigation from '../navigation';

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
  render() {
    return (
      <Box full="vertical" direction="row">
        <Box full="vertical" pad="small" colorIndex="neutral-5" alignContent="center">
          {Object.entries(navigation.SidebarMapping).map((entry) => {
            return <Image className="slick-sidebar-image" size="small" key={entry[0]} alt={entry[0]} src={"/img/" + entry[0] + ".png"} />;
          })}
          <Box flex="grow"></Box>
          <Menu icon={<UserIcon/>}>
            <Anchor onClick={logout} icon={<LogoutIcon/>}>Logout</Anchor>
          </Menu>
        </Box>
        <Box full="vertical" pad="small" colorIndex="grey-1-a">
          {React.createElement(navigation.SidebarMapping["project"], {})}
        </Box>
      </Box>
    );
  }
}