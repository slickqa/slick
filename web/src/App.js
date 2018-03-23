import React, { Component } from 'react';

import App from 'grommet/components/App';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {init as ApiInit} from './slick-api/gateway/index';
import './pages/*.js';
import './sidebar/*.js';
import UserState from './state/user';
import LoginState from './state/login';
import { Provider } from 'mobx-react';
import {reaction} from 'mobx';
import DevTools from 'mobx-react-devtools';
import * as CompanyApi from './slick-api/Company';

window.CompanyApi = CompanyApi;

import navigation from './navigation';


ApiInit({
  url: window.location.protocol + "//" + window.location.host,
  fetchOptions: {
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  }
});

export default class BasicApp extends Component {
  constructor(props) {
    super(props);
    this.UserState = new UserState();
    this.LoginState = new LoginState();
    window.UserSTate = this.UserState;
    window.LoginState = this.LoginState;
    if(Object.keys(this.UserState.User).length !== 0) {
      reaction(() => this.UserState.User.UserPreferences.Theme, () => {
        this.componentDidMount();
      });
    }
  }

  componentDidMount() {
    if(Object.keys(this.UserState.User).length !== 0) {
      let theme = this.UserState.User.UserPreferences.Theme;
      let el = window.document.getElementById("theme");
      if(el.href !== SlickThemes[theme]) {
        setTimeout(() => {el.href = SlickThemes[theme];}, 100);
      }
    }
  }

  render() {
    let devtools = null;
    if(localStorage.dev) {
      devtools = <DevTools/>;
    }
    return (
      <Provider UserState={this.UserState} LoginState={this.LoginState}>
      <App centered={false}>
        {devtools}
        <Router>
          <Switch>
            {Object.entries(navigation.URLMapping).map((entry) => {
              return <Route exact path={entry[0]} key={entry[0]} component={entry[1]} />;
            })}
          </Switch>
        </Router>
      </App>
      </Provider>
    );
  }
}
