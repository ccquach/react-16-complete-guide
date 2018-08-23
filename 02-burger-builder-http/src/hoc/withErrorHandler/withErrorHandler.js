import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      err: null
    };

    componentDidMount = () => {
      // clear error on http request
      axios.interceptors.request.use(req => {
        this.setState({ err: null });
        return req;
      });

      // set error returned by response
      axios.interceptors.response.use(
        res => res,
        err => this.setState({ err })
      );
    };

    // dismiss (clear) error on backdrop click
    errorConfirmedHandler = () => {
      this.setState({ err: null });
    };

    render() {
      return (
        <Auxiliary>
          <Modal
            show={!!this.state.err}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.err ? this.state.err.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
