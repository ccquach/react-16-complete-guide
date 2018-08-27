import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        label: 'Email',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Password'
        },
        value: '',
        label: 'Password',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    // return true if no validation rules defined for input
    if (!rules) return true;

    if (rules.required) isValid = value.trim() !== '' && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  inputChangedHandler = e => {
    const controls = this.state.controls;
    const targetName = e.target.name;
    const targetValue = e.target.value;
    const updatedControls = {
      ...controls,
      [targetName]: {
        ...controls[targetName],
        value: targetValue,
        valid: this.checkValidity(targetValue, controls[targetName].validation),
        touched: true
      }
    };
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
      isSignup: !prevState.isSignup
    }));
  };

  render() {
    // create an array from controls object
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
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

    return (
      <div className={classes.Auth}>
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
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
