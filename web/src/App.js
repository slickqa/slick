import React, { Component } from 'react';

import App from 'grommet/components/App';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {init as ApiInit} from './slick-api/gateway/index';
import './pages/*.js';
import './sidebar/*.js';
import BrowserStorage from './BrowserStorage';


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
    this.state = {
      theme: "Red"
    };

    if(BrowserStorage.User.UserPreferences && BrowserStorage.User.UserPreferences.Theme !== this.state.theme) {
      this.state.theme = BrowserStorage.User.UserPreferences.Theme;
    }

    BrowserStorage.onUpdateUserInfo((userInfo) => {
      if(userInfo.UserPreferences.Theme !== this.state.theme) {
        this.setState(() => {
          return {theme: userInfo.UserPreferences.Theme};
        });
      }
    });
  }

  componentDidMount() {
    let theme = this.state.theme;
    let el = window.document.getElementById("theme");
    if(el.href !== SlickThemes[theme]) {
      setTimeout(() => {el.href = SlickThemes[theme];}, 100);
    }
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  render() {
    return (
      <App centered={false}>
        <Router>
          <Switch>
            {Object.entries(navigation.URLMapping).map((entry) => {
              return <Route exact path={entry[0]} key={entry[0]} component={entry[1]} />;
            })}
          </Switch>
        </Router>
      </App>
    );
  }
}
