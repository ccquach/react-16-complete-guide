import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  };

  componentDidMount = () => {
    /* 
    URLSearchParams.entries() returns iterator 
    (from provided search property query string)
    with data formatted as ['salad', '1'] that can be 
    iterated over using for...of loop
    */
    const query = new URLSearchParams(this.props.location.search);
    // Build an ingredients object from data
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    // Updated state passed to CheckoutSummary to display current burger
    this.setState({ ingredients });
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
      </div>
    );
  }
}

export default Checkout;
