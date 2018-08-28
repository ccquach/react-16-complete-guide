import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as utilities from '../../utility';
import * as actions from '../../store/actions';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Email Address',
        },
        value: '',
        label: 'Email',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Password',
        },
        value: '',
        label: 'Password',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount = () => {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/')
      this.props.onSetAuthRedirectPath();
  };

  inputChangedHandler = e => {
    const updatedControls = utilities.getUpdatedForm(
      this.state.controls,
      e.target.name,
      e.target.value,
      utilities.checkValidity
    );
    this.setState({ controls: updatedControls });
  };

  submitHandler = e => {
    e.preventDefault();
    const controls = this.state.controls;
    this.props.onAuth(
      controls.email.value,
      controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      isSignup: !prevState.isSignup,
    }));
  };

  render() {
    // create an array from controls object
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    // map form control elements
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        {...formElement.config}
        changed={this.inputChangedHandler}
      />
    ));

    if (this.props.loading) form = <Spinner />;

    let errorMessage = null;
    if (this.props.error)
      errorMessage = (
        <p style={{ color: 'red' }}>Error! {this.props.error.message}</p>
      );

    let authRedirect = null;
    if (this.props.isAuthenticated)
      authRedirect = <Redirect to={this.props.authRedirectPath} />;

    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>
          {this.state.isSignup ? 'Sign up!' : 'Welcome back!'}
        </h2>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: !!state.auth.token,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
