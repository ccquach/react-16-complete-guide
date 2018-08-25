import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

const Backdrop = props =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} />
  ) : null;

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
};

export default Backdrop;
