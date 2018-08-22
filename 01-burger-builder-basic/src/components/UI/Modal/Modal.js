import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => (
  <Auxiliary>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? 1 : 0
      }}
    >
      {props.children}
    </div>
  </Auxiliary>
);

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired
};

export default Modal;
