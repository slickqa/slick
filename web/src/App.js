import React, { Component } from 'react';

import App from 'grommet/components/App';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {init as ApiInit} from './slick-api/gateway/index';
import './pages/*.js';
import './sidebar/*.js';
import tokenapi from './token-api';
import UserState from './state/user';
import { Provider } from 'mobx-react';
import {reaction} from 'mobx';
import DevTools from 'mobx-react-devtools';

import navigation from './navigation';

window.tokenapi = tokenapi;

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
    reaction(() => this.UserState.User.UserPreferences.Theme, () => {
      this.componentDidMount();
    });

  }

  componentDidMount() {
    let theme = this.UserState.User.UserPreferences.Theme;
    let el = window.document.getElementById("theme");
    if(el.href !== SlickThemes[theme]) {
      setTimeout(() => {el.href = SlickThemes[theme];}, 100);
    }
  }

  render() {
    let devtools = null;
    if(localStorage.dev) {
      devtools = <DevTools/>;
    }
    return (
      <Provider UserState={this.UserState}>
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
