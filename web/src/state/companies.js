import {observable, computed, action} from 'mobx';
import * as CompanyApi from '../slick-api/Company';


/**
 * @property {Array<slickqaCompanySettings>} companies
 */
export default class CompaniesState {
  @observable companies = [];

  /**
   * @returns {Promise<HttpResponse<slickqaAvailableCompanySettings>>}
   */
  @action load() {
    return CompanyApi.GetAvailableCompanySettings().then((response) => {
      this.companies = response.data.Companies;
      return response;
    });
  }

  /**
   * Add company settings.
   * @param {string} companyName
   * @returns {Promise<HttpResponse<slickqaCompanySettings>>}
   */
  @action addCompanySettings(companyName) {
    return CompanyApi.AddCompanySettings({CompanyName: companyName}).then(response => {
      if(response.raw.ok) {
        this.load();
      }
      return response;
    });
  }

  /**
   * @param {slickqaCompanySettings} companySettings
   * @returns {Promise<HttpResponse<slickqaCompanySettings>>}
   */
  @action updateCompanySettings(companySettings) {
    return CompanyApi.UpdateCompanySettings(companySettings.CompanyName, companySettings).then((response) => {
      // find the index
      let index = this.companies.findIndex(item => item.CompanyName === companySettings.CompanyName);
      if(index >= 0) {
        this.companies[index] = response.data;
      }
      return response;
    });
  }
}