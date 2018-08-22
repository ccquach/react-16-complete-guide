import React from 'react';

import classes from './Layout.css';
import Auxiliary from '../../hoc/Auxiliary';

const Layout = props => (
  <Auxiliary>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Auxiliary>
);

export default Layout;
