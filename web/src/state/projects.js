import {observable, computed, action} from 'mobx';
import * as ProjectsApi from '../slick-api/Projects';


/**
 * @property {Array<slickqaProject>} projects
 */
export default class ProjectsState {
  @observable projects = [];

  /**
   * @returns {Promise<HttpResponse<slickqaAvailableCompanySettings>>}
   */
  @action load() {
    return ProjectsApi.GetProjects().then((response) => {
      if(typeof response.data.Projects === "undefined") {
        this.projects = [];
      } else {
        this.projects = response.data.Projects;
      }
      return response;
    });
  }

  /**
   * Add a project.
   * @param companyName
   * @param projectName
   * @returns {Promise<HttpResponse<slickqaProject>>}
   */
  @action addProject(companyName, projectName) {
    return ProjectsApi.AddProject({Name: projectName, Company: companyName}).then(response => {
      if(response.raw.ok) {
        this.load();
      }
      return response;
    });
  }
}