import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';

class Routes extends Component {

  render() {
    return (
      <div className="Routes">
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/plotme/index" component={Home} />
        </Switch>
      </div>
    )
  };
};

export default Routes;