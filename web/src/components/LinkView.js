
import React, { Component } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import ImageIcon from 'grommet/components/icons/base/Image';
import LinkIcon from 'grommet/components/icons/base/Link';
import UnknownIcon from 'grommet/components/icons/base/Document';
import MarkdownIcon from 'grommet/components/icons/base/DocumentText';
import PreformattedTextIcon from 'grommet/components/icons/base/DocumentTxt';
import VideoIcon from 'grommet/components/icons/base/Video';
import QuestionMarkIcon from 'grommet/components/icons/base/CircleQuestion';
import Markdown from 'grommet/components/Markdown';
import Video from 'grommet/components/Video';
import {GetDownloadUrl} from '../slick-api/Links';
import {inject, observer} from 'mobx-react';
import PropTypes from "prop-types";
import {observable, set} from "mobx";


@observer
export class LinkItem extends Component {

  @observable link = {
    icon: <UnknownIcon/>,
    url: "#",
    name: ""
  };

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
  }

  componentDidMount() {
    let link = this.props.link;
    this.link.name = link.Id.Name;
    if(link.Type === "URL") {
      this.link.url = link.Url;
      this.link.icon = <LinkIcon/>;
    } else if(link.Type === "EmbeddedUrl") {
      this.link.url = link.Url;
      this.link.icon = <LinkIcon/>;
    } else if(link.Type === "File") {
      if(link.FileInfo && link.FileInfo.ContentType && link.FileInfo.ContentType.startsWith("text")) {
        if(link.FileInfo.FileName && link.FileInfo.FileName.endsWith(".md")) {
          this.link.icon = <MarkdownIcon/>;
        } else {
          this.link.icon = <PreformattedTextIcon/>;
        }
      } else if(link.FileInfo && link.FileInfo.ContentType && link.FileInfo.ContentType.startsWith("image")) {
        this.link.icon = <ImageIcon/>;
      } else if(link.FileInfo && link.FileInfo.ContentType && link.FileInfo.ContentType.startsWith("video")) {
        this.link.icon = <VideoIcon/>;
      }
    }
    if(link.Type === "File") {
      GetDownloadUrl(link.Id.Company, link.Id.Project, link.Id.EntityType, link.Id.EntityId, link.Id.Name)
        .then((resp) => {
          this.link.url = resp.data.Url;
        });
    }
  }

  onClick(event) {
    if(this.props.link.Type === "File" || this.props.link.Type === "EmbeddedUrl") {
      event.preventDefault();
      this.props.onClick();
    }
  }

  render() {
    // unused, replaced by specialty render
    return <Anchor icon={this.link.icon} href={this.link.url} target="_blank" onClick={this.onClick.bind(this)}>{this.link.name}</Anchor>;
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
    size: PropTypes.string,
  };

  @observable download = {
    url: "",
    content: ""
  };

  constructor(props) {
    super(props);
    window.embedded = this;
  }

  componentDidMount() {
    let link = this.props.link;
    if(link.Type === "File") {
      GetDownloadUrl(link.Id.Company, link.Id.Project, link.Id.EntityType, link.Id.EntityId, link.Id.Name)
        .then((resp) => {
          if (resp.data.Url) {
            this.download.url = resp.data.Url;
            if (link.Type === "File" && link.FileInfo.ContentType.startsWith("text")) {
              this.download.content = "Downloading...";
              fetch(resp.data.Url).then((response) => {
                response.text().then((content) => {
                  this.download.content = content;
                });
              });
            }
          }
        });
    }
  }

  render() {
    let link = this.props.link;
    let size = "large";
    if(this.props.size) {
      size = this.props.size;
    }
    if(link.Type === "File" && link.FileInfo.ContentType.startsWith("image")) {
      return <Box><img className="embedded-link-item-view" src={this.download.url} alt={link.Id.Name}/></Box>;
    } else if(link.Type === "File" && link.FileInfo.ContentType.startsWith("text")) {
      if(link.FileInfo.FileName.endsWith(".md")) {
        return <Box pad="medium"><Markdown content={this.download.content}/></Box>;
      } else {
        return <Box pad="small"><pre>{this.download.content}</pre></Box>;
      }
    } else if(link.Type === "File" && link.FileInfo.ContentType.startsWith("video")) {
        return <Video fit="contain" size={size} src={this.download.url} />;
    } else if(link.Type === "EmbeddedUrl") {
        return <Box tag="iframe" full="vertical" src={link.Url} allowtransparency="true" />;
    } else {
        return <Box align="center">
          <QuestionMarkIcon size="huge"/>
        </Box>;
    }
  }


}


