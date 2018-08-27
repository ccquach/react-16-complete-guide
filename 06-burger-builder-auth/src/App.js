import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  };

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
