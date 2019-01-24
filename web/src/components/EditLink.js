
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import TextInput from 'grommet/components/TextInput';
import FormField from 'grommet/components/FormField';
import CheckBox from 'grommet/components/CheckBox';
import UploadIcon from 'grommet/components/icons/base/CloudUpload';
import LinkIcon from 'grommet/components/icons/base/Link';
import DocumentIcon from 'grommet/components/icons/base/DocumentText';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from "prop-types";
import * as LinksApi from '../slick-api/Links';
import { FilePond, File, registerPlugin } from 'react-filepond';


@observer
export default class EditLink extends Component {

  @observable currentType = "Link";

  @observable link = {
    Id: {
      Name: ""
    },
    Url: "",
    Type: "URL"
  };

  static propTypes = {
    onDone: PropTypes.func,
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
    addNew: PropTypes.bool
  };


  // see https://pqina.nl/filepond/docs/patterns/api/server/#advanced
  // for details.
  process(fieldName, file, metadata, load, error, progress, abort) {
    if(!this.link.Id.Name) {
      this.link.Id.Name = file.name;
    }
    this.link.Type = "File";
    delete this.link.Url;
    delete this.link.FileInfo;
    let onDone = this.props.onDone;
    LinksApi.AddLink(this.link.Id.Company,
                     this.link.Id.Project,
                     this.link.Id.EntityType,
                     this.link.Id.EntityId,
                     this.link.Id.Name,
                     this.link).then(() => {
      LinksApi.GetUploadUrl(this.link.Id.Company,
                            this.link.Id.Project,
                            this.link.Id.EntityType,
                            this.link.Id.EntityId,
                            this.link.Id.Name,
                       {
                         FileName: file.name,
                         ContentType: file.type,
                         Size: file.size,
                       }).then((response) => {
        const request = new XMLHttpRequest();
        request.open('PUT', response.data.Url);
        request.upload.onprogress = (e) => {
          progress(e.lengthComputable, e.loaded, e.total);
        };

        request.onload = function() {
          if(request.status >= 200 && request.status < 300) {
            load(request.responseText);
            onDone();
          } else {
            error("Problem occurred uploading file.");
          }
        };

        request.send(file);
      });
    });

  }

  constructor(props) {
    super(props);
    this.toggleEmbedded = this.toggleEmbedded.bind(this);
    this.saveLink = this.saveLink.bind(this);
    this.process = this.process.bind(this);
    let processFunc = this.process;
    this.FilePondServer = {
      process: processFunc
    };

  }

  componentDidMount() {
    this.link = this.props.link;
    if(!this.link.Url) {
      this.link.Url = "";
    }
    if(!this.link.Type) {
      this.link.Type = "URL";
    }
  }

  render() {
    let {onDone} = this.props;

    return <Box>
      <Tabs>
        <Tab title="Link">
          <FormField label="Name">
            <TextInput onDOMChange={(event) => {this.link.Id.Name = event.target.value;}} value={this.link.Id.Name} placeHolder="Link to Wonderful Thing"/>
          </FormField>
          <FormField label={<Box direction="row"><LinkIcon/><Box pad={{horizontal: "small"}}>URL</Box></Box>}>
            <TextInput onDOMChange={(event) => {this.link.Url = event.target.value;}} value={this.link.Url} placeHolder="https://"/>
          </FormField>
          <FormField label="Embed in Slick">
            <CheckBox toggle={true} checked={this.link.Type === "EmbeddedUrl"} onChange={this.toggleEmbedded} label="Show this link inside of an iframe in slick."/>
          </FormField>
        </Tab>
        <Tab title="Upload">
          <FormField label="Name">
            <TextInput onDOMChange={(event) => {this.link.Id.Name = event.target.value;}} value={this.link.Id.Name} placeHolder="Display Name"/>
          </FormField>
          <FormField label="File">
            <Box pad={{horizontal: "small"}}>
              <FilePond server={this.FilePondServer}/>
            </Box>
          </FormField>
        </Tab>
      </Tabs>
      <Box margin={{top: "small"}} direction="row">
        <Box margin={{right: "small"}}><Button label="Save" onClick={this.saveLink}/></Box>
        <Button label="Cancel" onClick={onDone}/>
      </Box>
    </Box>;
  }

  toggleEmbedded() {
    if(this.link.Type === "EmbeddedUrl") {
      this.link.Type = "URL";
    } else {
      this.link.Type = "EmbeddedUrl";
    }
  }

  saveLink() {
    if(this.props.addNew) {
      if (this.link.Type !== "File") {
        delete this.link.FileInfo; // just in case, it should be ignored anyway
        LinksApi.AddLink(this.link.Id.Company, this.link.Id.Project, this.link.Id.EntityType, this.link.Id.EntityId, this.link.Id.Name, this.link).then(() => {
          this.props.onDone();
        })
      }
    }

  }

}

