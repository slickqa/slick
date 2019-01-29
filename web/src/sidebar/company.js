
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import {inject, observer} from 'mobx-react';
import {observable} from "mobx";
import { withRouter } from "react-router-dom";
import * as CompanyService from '../slick-api/Company';
import * as LinksService from '../slick-api/Links';
import {LinkItem} from '../components/LinkView';

/**
 *
 * @param {slickqaCompanySettings} company
 * @return {Array<slickqaLink>}
 */
function linksFromCompany(company, companyLinks) {
  if(companyLinks[company.CompanyName]) {
    return companyLinks[company.CompanyName];
  }
  return [];
}

@inject('CompaniesState') @observer
class CompanySideBarComponent extends Component {
  @observable companies = [];
  @observable companyLinks = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    CompanyService.GetAvailableCompanySettings().then((response) => {
      if (response.data.Companies) {
        this.companies = response.data.Companies;
        response.data.Companies.forEach((company) => {
          LinksService.GetLinks(company.CompanyName, "-", "Company", "-").then((resp) => {
            if(resp.data.links) {
              this.companyLinks[company.CompanyName] = resp.data.links;
            }
          })
        });
      }
    });
  }

  render() {
    let {CompaniesState, history} = this.props;
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Company Links</Heading>
        </Box>
        {
          this.companies.map((company) => {
            return <Box key={company.CompanyName}>
              <Heading tag="h4">{company.CompanyName}</Heading>
              <Box pad={{horizontal: "small"}}>
                {
                  linksFromCompany(company, this.companyLinks).map((link) => {

                      return <Box key={company.CompanyName + link.Id.Name} colorIndex={CompaniesState.current.company === company.CompanyName && CompaniesState.current.link === link.Id.Name ? 'brand-a' : null}>
                        <LinkItem link={link} onClick={() => {
                            if(link.Type === "File" || link.Type === "EmbeddedUrl") {
                              history.push('/links/' + company.CompanyName + "/" + link.Id.Name)
                            }
                        }} size="xsmall"/>
                      </Box>;
                  })
                }
              </Box>
            </Box>
          })
        }
      </Box>
    );
  }
}

export default withRouter(CompanySideBarComponent);
