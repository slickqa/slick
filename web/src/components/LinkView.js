
import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import ImageIcon from 'grommet/components/icons/base/Image';
import UnknownIcon from 'grommet/components/icons/base/Document';
import {GetDownloadUrl} from '../slick-api/Links';
import {inject, observer} from 'mobx-react';
import PropTypes from "prop-types";
import {observable} from "mobx";


@observer
export class LinkItem extends Component {
  static propTypes = {
    link: PropTypes.shape({
      Id: PropTypes.shape({
        Company: PropTypes.string,
        Project: PropTypes.string,
        EntityType: PropTypes.string,
        EntityId: PropTypes.string,
        Name: PropTypes.string,
      }),
      Type: PropTypes.string,
      Url: PropTypes.string,
      Creator: PropTypes.string,
      FileInfo: PropTypes.shape({
        Path: PropTypes.string,
        FileName: PropTypes.string,
        ContentType: PropTypes.string,
        Size: PropTypes.string,
      }),
    }),
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    let link = this.props.link;
    if(link.Type === "URL") {
      this.render = this.renderUrl.bind(this);
    } else if(link.Type === "File" && link.FileInfo.ContentType.startsWith("image")) {
      this.render = this.renderImageLink.bind(this);
    } else {
      this.render = this.renderUnknownLink.bind(this);
    }
  }

  render() {
    // unused, replaced by specialty render
  }

  renderImageLink() {
    let link = this.props.link;
    return <Anchor icon={<ImageIcon/>} onClick={this.props.onClick}>{link.Id.Name}</Anchor>;
  }

  renderUrl() {
    let link = this.props.link;
    return <Anchor path={link.Url}>{link.Id.Name}</Anchor>;
  }

  renderUnknownLink() {
    let link = this.props.link;
    return <Anchor icon={<UnknownIcon/>} onClick={this.props.onClick}>{link.Id.Name}</Anchor>;
  }

}

@observer
export class EmbeddedLinkItemView extends Component {

  static propTypes = {
    link: PropTypes.shape({
      Id: PropTypes.shape({
        Company: PropTypes.string,
        Project: PropTypes.string,
        EntityType: PropTypes.string,
        EntityId: PropTypes.string,
        Name: PropTypes.string,
      }),
      Type: PropTypes.string,
      Url: PropTypes.string,
      Creator: PropTypes.string,
      FileInfo: PropTypes.shape({
        Path: PropTypes.string,
        FileName: PropTypes.string,
        ContentType: PropTypes.string,
        Size: PropTypes.string,
      }),
    }),
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    let link = this.props.link;
    if(link.Type === "File" && link.FileInfo.ContentType.startsWith("image")) {
      this.render = this.renderImageLink.bind(this);
    } else {
      this.render = this.renderUnknownLink.bind(this);
    }
    this.state = {
      downloadUrl: ""
    };
  }

  componentDidMount() {
    let link = this.props.link;
    GetDownloadUrl(link.Id.Company, link.Id.Project, link.Id.EntityType, link.Id.EntityId, link.Id.Name)
      .then((resp) => {
        if(resp.data.Url) {
          this.setState(() => {
            return {downloadUrl: resp.data.Url};
          });
        }
      });
  }

  render() {
    // replaced at creation time by type specific render
  }

  renderImageLink() {
    let link = this.props.link;
    return <Box><img className="embedded-link-item-view" src={this.state.downloadUrl} alt={link.Id.Name}/></Box>;
  }


}


