import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';

class Routes extends Component {

  render() {
    return (
      <div className="Routes">
        <Route path="/" component={Header} />
      </div>
    )
  };
};

export default Routes;