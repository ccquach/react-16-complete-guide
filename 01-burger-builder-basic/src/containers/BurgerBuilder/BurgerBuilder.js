import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
  };

  addIngredientHandler = type => {
    this.setState(prevState => ({
      ingredients: {
        ...prevState.ingredients,
        [type]: prevState.ingredients[type] + 1
      },
      totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
    }));
  };

  removeIngredientHandler = type => {
    // calculate new count of ingredients
    const oldCount = this.state.ingredients[type];
    // exit if no ingredient to remove
    if (oldCount <= 0) return;

    // update state
    this.setState(prevState => ({
      ingredients: { ...prevState.ingredients, [type]: oldCount - 1 },
      totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
    }));
  };

  render() {
    // determine which Less buttons to disable
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
