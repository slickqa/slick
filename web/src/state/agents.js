import {observable, computed, action} from 'mobx';
import * as AgentsApi from '../slick-api/Agents';


/**
 */
export default class AgentsState {
  @observable agentsByName = {};

  @observable pollForUpdates = false;

  @observable companies = [];

  @observable lastUpdate = new Date(Date.now() - (30 * 60 * 1000));

  @observable currentCompany = "";

  constructor() {
    this.timer = setInterval(this.poll.bind(this), 1500);
  }

  poll() {
    if(this.pollForUpdates) {
      this.load();
    }
  }


  /**
   */
  @action load() {
    this.companies.forEach((company) => {
      AgentsApi.GetAgents(company, {UpdatedSince: this.lastUpdate}).then((response) => {
        this.processAgentsResponse(response);
      });
    });
  }

  @action processAgentsResponse(response) {
    if(response.data.Agents) {
      let lastUpdate = this.lastUpdate;
      response.data.Agents.forEach((agent) => {
        if(agent && agent.Id && agent.status) {
          if (!this.agentsByName[agent.Id.Company]) {
            this.agentsByName[agent.Id.Company] = {};
          }
          this.agentsByName[agent.Id.Company][agent.Id.Name] = agent;
          let agentLastUpdated = new Date((new Date(agent.LastCheckin)).getTime() - 1000);
          if (agentLastUpdated > lastUpdate) {
            lastUpdate = agentLastUpdated;
          }
        }
      });
      this.lastUpdate = lastUpdate;
    }
  }

  /**
   */
  @computed get statsForAgentsByCompany() {
    let companiesTree = {};
    Object.keys(this.agentsByName).forEach((company) => {
      companiesTree[company] = {};
      companiesTree[company]["Total"] = 0;
      companiesTree[company]["Projects"] = {};
      Object.keys(this.agentsByName[company]).forEach((agentName) => {
        let agent = this.agentsByName[company][agentName];
        if(agent && agent.status) {
          if (!companiesTree[company][agent.status.RunStatus]) {
            companiesTree[company][agent.status.RunStatus] = 0;
          }
          companiesTree[company][agent.status.RunStatus]++;
          companiesTree[company]["Total"]++;
          agent.status.Projects.forEach((project) => {
            if (!companiesTree[company]["Projects"][project.Project]) {
              companiesTree[company]["Projects"][project.Project] = {
                "Total": 0,
              }
            }
            if (!companiesTree[company]["Projects"][project.Project][agent.status.RunStatus]) {
              companiesTree[company]["Projects"][project.Project][agent.status.RunStatus] = 0;
            }
            companiesTree[company]["Projects"][project.Project][agent.status.RunStatus]++;
            companiesTree[company]["Projects"][project.Project]["Total"]++;
          });
        }
      });
    });
    return companiesTree;
  }
}