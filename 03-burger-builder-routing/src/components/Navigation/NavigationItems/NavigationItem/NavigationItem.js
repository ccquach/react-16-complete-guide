import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const NavigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      {/* update NavLink active class name to unique name created by css-modules */}
      <NavLink
        exact={props.exact}
        to={props.link}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

NavigationItem.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

export default NavigationItem;
