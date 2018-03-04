
import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import * as CompanyService from '../slick-api/Company';

/**
 *
 * @param {slickqaCompanySettings} company
 * @return {Array<slickqaLink>}
 */
function linksFromCompany(company) {
  if(company.Links) {
    return company.Links;
  }
  return [];
}

export default class CompanySideBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
    CompanyService.GetAvailableCompanySettings().then((response) => {
      if(response.data.Companies) {
        this.setState(() => {
          return {companies: response.data.Companies}
        })
      }
    });
  }

  render() {
    return (
      <Box>
        <Heading tag="h3">Company Links</Heading>
        {
          this.state.companies.map((company) => {
            return <Box key={company.CompanyName}>
              <Heading tag="h4">{company.CompanyName}</Heading>
              <Box pad="small">
                {
                  linksFromCompany(company).map((link) => {
                      return <Anchor path={link.Url}>{link.Name}</Anchor>;
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

