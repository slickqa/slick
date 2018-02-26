
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import navigation from '../navigation';


export default class Navbar extends Component {
  render() {
    return (
      <Box full="vertical" direction="columns">
        <Box full="vertical" pad="small" colorIndex="neutral-5" alignContent="center">
          {Object.entries(navigation.SidebarMapping).map((entry) => {
            return <Image className="slick-sidebar-image" size="small" key={entry[0]} alt={entry[0]} src={"/img/" + entry[0] + ".png"} />;
          })}
        </Box>
        <Box full="vertical" pad="small" colorIndex="grey-1-a">
          {React.createElement(navigation.SidebarMapping["project"], {})}
        </Box>
      </Box>
    );
  }
}