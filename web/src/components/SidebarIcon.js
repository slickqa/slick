import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import Tip from 'grommet/components/Tip';
import navigation from '../navigation';
import PropTypes from "prop-types";

export default class SidebarIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToolTip: false
    };
    this.onHover = this.onHover.bind(this);
    this.onHoverLeave = this.onHoverLeave.bind(this);
  }

  onHover() {
    this.setState(() => {
      return {showToolTip: true};
    });
  }

  onHoverLeave() {
    this.setState(() => {
      return {showToolTip: false};
    });
  }

  render() {
    let tip = null;
    if(this.state.showToolTip) {
      tip=<Tip target={"slick-nav-button-" + this.props.name} onClose={this.onHoverLeave}>{this.props.name}</Tip>;
    }
    return (
      <Box colorIndex={this.props.selected ? "grey-1-a" : "neutral-5"}>
        <Button id={"slick-nav-button-" + this.props.name} icon={this.props.icon} onClick={this.props.onSelect} onMouseEnter={this.onHover} onMouseLeave={this.onHoverLeave}>
          {tip}
        </Button>
      </Box>
    );
  }
}

SidebarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func
};
