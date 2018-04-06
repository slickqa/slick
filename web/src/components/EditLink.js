
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import UploadIcon from 'grommet/components/icons/base/CloudUpload';
import LinkIcon from 'grommet/components/icons/base/Link';
import DocumentIcon from 'grommet/components/icons/base/DocumentText';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from "prop-types";

@observer
export default class EditLink extends Component {

  static defaultProps = {
    allowDocument: true
  };

  static modes = ["url", "upload", "document"];

  static propTypes = {
    link: PropTypes.shape({
      Url: PropTypes.string,
      Name: PropTypes.string,
      FileId: PropTypes.string,
      DocumentId: PropTypes.string
    }),
    default: PropTypes.oneOf(EditLink.modes),
    onLinkChange: PropTypes.func,
    allowDocument: PropTypes.bool
  };

  icons = {
    "url": <LinkIcon/>,
    "upload": <UploadIcon/>,
    "document": <DocumentIcon/>
  };

  @observable mode = "url";

  constructor(props) {
    super(props);
    if("default" in props) {
      this.mode = this.props.default;
    }
  }

}

