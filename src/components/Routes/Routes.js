import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Quote from '../Quote/Quote';

class Routes extends Component {

  render() {
    return (
      <div className="Routes">
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/plotme/index" component={Home} />
          <Route path="/plotme/quote/:ticker" component={Quote} />
        </Switch>
      </div>
    );
  }
}

export default Routes;