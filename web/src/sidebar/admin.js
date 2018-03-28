import React, { Component } from 'react';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Button from 'grommet/components/Button';
import AddCircle from 'grommet/components/icons/base/AddCircle';
import Add from 'grommet/components/icons/base/Add';
import Configure from 'grommet/components/icons/base/Configure';
import Close from 'grommet/components/icons/base/Close';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';

/**
 * @typedef {Object} AdminSideBarProps
 *
 * @property {CompaniesState} CompaniesState
 * @property {ProjectsState} ProjectsState
 * @property {LoginState} LoginState
 */

/**
 * @property {AdminSideBarProps} props
 */
@inject('CompaniesState', 'ProjectsState', 'LoginState') @observer
export default class AdminSideBarComponent extends Component {

  @observable selected = "";
  @observable addCompanyMode = false;
  @observable addProjectMode = false;

  componentDidMount() {
    this.props.CompaniesState.load();
    this.props.ProjectsState.load();
  }

  render() {
    let addCompanyResponse = (e) => {
      e.preventDefault();
      let newCompanyName = document.getElementById('admin-sidebar-add-company-input').value;
      this.props.CompaniesState.addCompanySettings(newCompanyName).then(() => {
        this.addCompanyMode = false;
      });
    };

    let addProjectResponse = (e) => {
      e.preventDefault();
      let newProjectName = document.getElementById('admin-sidebar-add-project-input').value;
      this.props.ProjectsState.addProject(this.selected, newProjectName).then(() => {
        this.addProjectMode = false;
      });
    };
    let selectedCompany = this.selected;
    let companiesTree = {};
    let companyAdminList = this.props.LoginState.CompanyAdminList;
    this.props.CompaniesState.companies.forEach(companySettings => {
      companiesTree[companySettings.CompanyName] = {
        isAdmin: this.props.LoginState.IsSlickAdmin || (companyAdminList.findIndex(name => name === companySettings.CompanyName)),
        projects: []
      }
    });
    this.props.ProjectsState.projects.forEach(project => {
      if(!(project.Id.Company in companiesTree)) {
        companiesTree[project.Id.Company] = {
          isAdmin: this.props.LoginState.IsSlickAdmin || (companyAdminList.findIndex(name => name === project.Id.Company)),
          projects: []
        };
      }
      companiesTree[project.Id.Company].projects.push(project)
    });
    if(selectedCompany === "" || selectedCompany === null || typeof selectedCompany === "undefined") {
      if(companyAdminList.length > 0) {
        selectedCompany = companyAdminList[0];
      } else {
        selectedCompany = Object.keys(companiesTree)[0];
      }
      setTimeout(() => {this.selected = selectedCompany;}, 0);
    }
    let company = companiesTree[selectedCompany];
    if(typeof company === "undefined") {
      company = {
        isAdmin: false,
        projects: []
      }
    }
    window.companiesTree = companiesTree;
    window.company = company;
    let projectsHeader = <Box><Heading tag="h4">Projects:</Heading></Box>;
    if(company.isAdmin || this.props.LoginState.IsSlickAdmin) {
      projectsHeader =
        <Box direction="row">
          <Box flex={true} justify="center"><Heading tag="h4" margin="none">Projects:</Heading></Box>
          <Box><Button icon={<AddCircle/>} onClick={() => {this.addProjectMode = true;}}/></Box>
        </Box>;
    }

    let addCompanyForm = null;
    if(this.addCompanyMode) {
      addCompanyForm = <Form compact={true} onSubmit={addCompanyResponse}>
        <Box direction="row">
          <Box flex={true}><TextInput id="admin-sidebar-add-company-input" placeHolder="Company Name" autoFocus={true}/></Box>
          <Button icon={<Add />} primary={true} type="submit"/>
          <Button icon={<Close />} primary={true} onClick={(e) => {e.preventDefault(); this.addCompanyMode = false;}} />
        </Box>
      </Form>;
    }

    let addProjectForm = null;
    if(this.addProjectMode) {
      addProjectForm = <Form compact={true} onSubmit={addProjectResponse}>
        <Box direction="row">
          <Box flex={true}><TextInput id="admin-sidebar-add-project-input" placeHolder="Project Name" autoFocus={true}/></Box>
          <Button icon={<Add />} primary={true} type="submit"/>
          <Button icon={<Close />} primary={true} onClick={(e) => {e.preventDefault(); this.addProjectMode = false;}} />
        </Box>
      </Form>;
    }


    return (
      <Box>
        <Box separator="bottom">
          <Heading tag="h3" align="center">Administration</Heading>
          <Box direction="row">
            <Box flex={true}>
              {Object.keys(companiesTree).length === 1 ? selectedCompany : <Select value={selectedCompany} options={Object.keys(companiesTree)} onChange={e => {this.selected = e.option;}}/>}
            </Box>
            <Box>
              {this.props.LoginState.IsSlickAdmin || company.isAdmin ? <Button icon={<Configure />} method="replace" path={"/admin/company-settings/" + selectedCompany}/> : null}
            </Box>
            <Box>
              {this.props.LoginState.IsSlickAdmin ? <Button icon={<AddCircle />} onClick={() => {this.addCompanyMode = true;}}/> : null}
            </Box>
          </Box>
          {addCompanyForm}
        </Box>
        {projectsHeader}
        {addProjectForm}
        <Box pad={{horizontal: "small"}}>
          {
            company.projects.map(project => {
              return (
                <Anchor key={project.Id.Name} label={project.Id.Name} path={"/admin/project/" + project.Id.Company + "/" + project.Id.Name}/>
              );
            })
          }
        </Box>
      </Box>
    );
  }
}

