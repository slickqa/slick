import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import StandardPage from './standard';
import navigation from '../navigation';
import {EmbeddedLinkItemView} from "../components/LinkView";
import {GetLinks} from "../slick-api/Links";
import {inject, observer} from 'mobx-react';
import {observable} from "mobx";
import qs from 'query-string';

@inject('CompaniesState', 'LoginState') @observer
export class CompanyLinkView extends Component {
  @observable links = [];

  @observable current = {};

  constructor(props) {
    super(props);
    this.refreshLinks = this.refreshLinks.bind(this);
  }

  componentDidMount() {
    this.refreshLinks();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.match.params.company !== this.props.match.params.company ||
       prevProps.match.params.link !== this.props.match.params.link ) {
      this.refreshLinks();
    }
  }

  refreshLinks() {
    let companyParam = this.props.match.params.company;
    let linkParam = this.props.match.params.link;
    document.title = linkParam + " - " + companyParam + " - Slick";
    GetLinks(companyParam, "-", "Company", "-").then((resp) => {
      if(resp.data.links) {
        this.links = resp.data.links;
        this.links.forEach((link) => {
          if(link.Id.Name === linkParam) {
            this.current = link;
          }
        });
      }
    });
  }

  render() {
    let { CompaniesState } = this.props;
    let content = <Box pad="small">Loading...</Box>;
    if(this.current.hasOwnProperty("Id")) {
      setTimeout(() => {
        CompaniesState.current.company = this.current.Id.Company;
        CompaniesState.current.link = this.current.Id.Name;
      }, 0);
      content = <EmbeddedLinkItemView link={this.current}/>;
    }

    return (
      <StandardPage nav="Company">
        {content}
      </StandardPage>
    );
  }

}

navigation.registerUrlMapping("/links/:company/:link", CompanyLinkView);
