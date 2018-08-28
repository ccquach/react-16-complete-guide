import React from 'react';
import PropTypes from 'prop-types';

import classes from './Order.css';

const Order = props => {
  // convert ingredients object to array
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  // create an array of ingredient elements to display
  const ingredientOutput = ingredients.map(ig => (
    <span
      key={ig.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
    >{`${ig.name} (${ig.amount})`}</span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

Order.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired
  }).isRequired,
  price: PropTypes.number.isRequired
};

export default Order;
