import PropTypes from "prop-types";
import React, {Component} from "react";
import Title from 'grommet/components/Title';

export default class SlickLogo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let className = "slick-logo-xlarge";
    if (this.props.size) {
      className = "slick-logo-" + this.props.size;
    }
    return <Title className={className} responsive={false}>S<span style={{"fontSize": "70%"}}>LICK</span></Title>;
  }
}

SlickLogo.propTypes = {
  size: PropTypes.oneOf(["xlarge", "medium"])
};
