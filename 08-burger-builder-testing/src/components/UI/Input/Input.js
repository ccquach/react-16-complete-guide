import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.css';

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  /*
  Input should only be marked as invalid if property:
    - Is invalid
    - Has validation rules
    - Has been touched 
  */
  if (!props.valid && props.validation && props.touched)
    inputClasses.push(classes.Invalid);

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          name={props.elementConfig.name}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  validation: PropTypes.object.isRequired,
  valid: PropTypes.bool.isRequired,
  changed: PropTypes.func.isRequired
};

export default Input;
