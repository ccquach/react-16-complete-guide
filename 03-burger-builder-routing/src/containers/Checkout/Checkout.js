import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount = () => {
    /* 
    URLSearchParams.entries() returns iterator 
    (from provided search property query string)
    with data formatted as ['salad', '1'] that can be 
    iterated over using for...of loop
    */
    const query = new URLSearchParams(this.props.location.search);
    // Build an ingredients object from data
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') price = +param[1];
      else ingredients[param[0]] = +param[1];
    }
    // Updated state passed to CheckoutSummary to display current burger
    this.setState({ ingredients, price });
  };

  checkoutCancelledHandler = () => {
    // Return to burger builder page
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
