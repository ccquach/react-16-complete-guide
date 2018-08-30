import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent';
import Users from './containers/Users';

const AsyncPizza = asyncComponent(() => import('./containers/Pizza'));

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Users</Link> | <Link to="/pizza">Pizza</Link>
        </div>
        <div>
          <Route path="/" exact component={Users} />
          <Route path="/pizza" component={AsyncPizza} />
        </div>
      </div>
    );
  }
}

export default App;
