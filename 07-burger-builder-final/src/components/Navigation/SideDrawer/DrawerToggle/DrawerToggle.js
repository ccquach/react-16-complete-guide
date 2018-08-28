import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.css';

const DrawerToggle = props => (
  <div onClick={props.clicked} className={classes.DrawerToggle}>
    <div />
    <div />
    <div />
  </div>
);

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default DrawerToggle;
