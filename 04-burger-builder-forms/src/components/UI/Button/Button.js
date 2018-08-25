import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const Button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  btnType: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Button;
