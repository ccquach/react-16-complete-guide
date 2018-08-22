import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState = () => {
    const totalCountOfIngredients = Object.values(
      this.state.ingredients
    ).reduce((sum, next) => sum + next, 0);

    this.setState({
      purchasable: totalCountOfIngredients > 0
    });
  };

  addIngredientHandler = type => {
    this.setState(
      prevState => ({
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      }),
      () => this.updatePurchaseState()
    );
  };

  removeIngredientHandler = type => {
    // calculate new count of ingredients
    const oldCount = this.state.ingredients[type];
    // exit if no ingredient to remove
    if (oldCount <= 0) return;

    // update state
    this.setState(
      prevState => ({
        ingredients: { ...prevState.ingredients, [type]: oldCount - 1 },
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
      }),
      () => this.updatePurchaseState()
    );
  };

  purchaseHandler = () => {
    // toggle order summary modal
    this.setState({ purchasing: !this.state.purchasing });
  };

  purchaseContinueHandler = () => {
    // TODO: hook up to server
    alert('You continue!');
  };

  render() {
    // determine which Less buttons to disable
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCanceled={this.purchaseHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
