import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          closed={this.sideDrawerToggleHandler}
          open={this.state.showSideDrawer}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(Layout);
