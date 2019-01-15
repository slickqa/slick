import {observable, computed, action} from 'mobx';
import * as AgentsApi from '../slick-api/Agents';


/**
 */
export default class AgentsState {
  @observable agentsByName = {};

  @observable agentsByGroup = {};

  @observable pollForUpdates = false;

  @observable companies = [];

  @observable lastUpdate = new Date(Date.now() - (30 * 60 * 1000));

  @observable currentCompany = "";

  constructor() {
    this.timer = setInterval(this.poll.bind(this), 1500);
    this.removeTimer = setInterval( () => {
      if (this.pollForUpdates) {
        this.removeOldAgents();
      }
    }, 20000);
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

  removeFromGroups(agent) {
    if(this.agentsByGroup[agent.Id.Company] && agent.status.Groups) {
      agent.status.Groups.forEach((group) => {
        if(this.agentsByGroup[agent.Id.Company][group]) {
          let index = this.agentsByGroup[agent.Id.Company][group].indexOf(agent.Id.Name);
          if (index >= 0) {
            this.agentsByGroup[agent.Id.Company][group].splice(index, 1);
            if(this.agentsByGroup[agent.Id.Company][group].length === 0) {
              delete this.agentsByGroup[agent.Id.Company][group]
            }
          }
        }
      });
    }
  }

  @action processAgentsResponse(response) {
    if(response.data.Agents) {
      let originalUpdate = this.lastUpdate;
      let lastUpdate = this.lastUpdate;
      response.data.Agents.forEach((agent) => {
        if(agent && agent.Id && agent.status && (new Date(agent.LastCheckin)) > originalUpdate) {
          if (!this.agentsByName[agent.Id.Company]) {
            this.agentsByName[agent.Id.Company] = {};
          }
          if (!this.agentsByGroup[agent.Id.Company]) {
            this.agentsByGroup[agent.Id.Company] = {};
          }
          if(this.agentsByName[agent.Id.Company][agent.Id.Name]) {
            this.removeFromGroups(this.agentsByName[agent.Id.Company][agent.Id.Name]);
          }
          this.agentsByName[agent.Id.Company][agent.Id.Name] = agent;
          if(agent.status.Groups) {
            agent.status.Groups.forEach((group) => {
              if(!this.agentsByGroup[agent.Id.Company][group]) {
                this.agentsByGroup[agent.Id.Company][group] = [];
              }
              this.agentsByGroup[agent.Id.Company][group].push(agent.Id.Name);
            });
          }
          let agentLastUpdated = new Date((new Date(agent.LastCheckin)).getTime());
          if (agentLastUpdated > lastUpdate) {
            lastUpdate = agentLastUpdated;
          }
        }
      });
      this.lastUpdate = lastUpdate;
    }
  }

  @action removeOldAgents() {
    let tooOld = new Date(Date.now() - (30 * 60 * 1000));
    let screenshotTooOld = new Date(Date.now() - (2 * 60 * 1000));

    Object.keys(this.agentsByName).forEach((company) => {
      Object.keys(this.agentsByName[company]).forEach((agentName) => {
        let agent = this.agentsByName[company][agentName];
        if((new Date(agent.LastCheckin)) < tooOld ||
           (new Date(agent.LastScreenshotUpdate)) < screenshotTooOld) {
          this.removeFromGroups(agent);
          delete this.agentsByName[company][agentName];
        }
      })
    });
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

  statsForGroup(companyName, groupName) {
    let retval = {
      Total: 0
    };
    this.agentsByGroup[companyName][groupName].forEach((agentName) => {
      let agent = this.agentsByName[companyName][agentName];
      retval.Total++;
      if(!retval[agent.status.RunStatus]) {
        retval[agent.status.RunStatus] = 0;
      }
      retval[agent.status.RunStatus]++;
    });

    return retval;
  }
}