import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close].join(' ');
  if (props.open)
    attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
  return (
    <Auxiliary>
      <Backdrop clicked={props.closed} show={props.open} />
      <div className={attachedClasses} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};

SideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default SideDrawer;
