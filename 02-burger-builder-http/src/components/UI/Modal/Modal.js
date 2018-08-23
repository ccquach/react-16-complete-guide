import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  /* 
  Prevent update of OrderSummary if modal not showing.
  Not extending PureComponent because it would execute more checks than needed.
  */
  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log(`[Modal] willUpdate`);
  };

  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }}
        >
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired
};

export default Modal;
