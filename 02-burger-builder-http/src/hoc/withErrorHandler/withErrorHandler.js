import React, { Component } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      err: null
    };

    /*
    Define interceptors BEFORE child components are rendered
    so that they're in place when HTTP request made in
    componentDidMount() of wrapped component
    */
    componentWillMount = () => {
      // clear error on http request
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ err: null });
        return req;
      });

      // set error returned by response
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        err => this.setState({ err })
      );
    };

    /*
    New interceptors created each time HOC called 
    (wrapped around component), all added onto the same axios 
    instance. Consider the number of interceptors created
    when switching between pages and wrapped components
    unmounted and mounted each time. We end up with 
    a lot of dead interceptors that leak memory
    (code that still runs but that's not required).
    Clean up interceptors when wrapped component unmounts.
    */
    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
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
