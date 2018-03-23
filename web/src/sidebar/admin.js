import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import AdminIcon from 'grommet/components/icons/base/License';
import navigation from '../navigation';
import {observer, inject} from 'mobx-react';

/**
 * @property {CompaniesState} props.CompaniesState
 */
@inject('CompaniesState') @observer
export default class AdminSideBarComponent extends Component {

  componentDidMount() {
    this.props.CompaniesState.load();
  }

  render() {
    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Administration</Heading>
        </Box>
        {
          this.props.CompaniesState.companies.map((company) => {
            return <Anchor key={company.CompanyName} label={company.CompanyName}/>;
          })
        }
      </Box>
    );
  }
}

