import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={props.ingredientAdded.bind(this, ctrl.type)}
        removed={props.ingredientRemoved.bind(this, ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

BuildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.shape({
    salad: PropTypes.bool.isRequired,
    bacon: PropTypes.bool.isRequired,
    cheese: PropTypes.bool.isRequired,
    meat: PropTypes.bool.isRequired,
  }).isRequired,
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default BuildControls;
