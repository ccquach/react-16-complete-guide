import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  const transformedIngredients = Object.keys(props.ingredients).map(igKey =>
    [...Array(props.ingredients[igKey])].map((_, i) => (
      <BurgerIngredient key={igKey + i} type={igKey} />
    ))
  );
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired
  }).isRequired
};

export default Burger;
