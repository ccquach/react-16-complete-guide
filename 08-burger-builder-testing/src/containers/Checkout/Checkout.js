import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const asyncContactData = asyncComponent(() =>
  import('./ContactData/ContactData')
);

export class Checkout extends Component {
  checkoutCancelledHandler = () => {
    // Return to burger builder page
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={asyncContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
