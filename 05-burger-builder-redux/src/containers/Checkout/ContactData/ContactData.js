import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'name',
          placeholder: 'Your Name'
        },
        value: '',
        label: 'Name',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'street',
          placeholder: 'Street'
        },
        value: '',
        label: 'Street',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'zipCode',
          placeholder: 'Zip Code'
        },
        value: '',
        label: 'Zip Code',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'country',
          placeholder: 'Country'
        },
        value: '',
        label: 'Country',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        label: 'Email',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          name: 'deliveryMethod',
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        label: 'Delivery Method',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    // build customer object from form inputs
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    // build complete order object
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: formData
    };
    // send POST request
    axios
      .post('/orders.json', order)
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        // Redirect to homepage after order submission
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  checkValidity = (value, rules) => {
    // return true if no validation rules defined for input
    if (!rules) return true;
    // if rules defined, validate input data
    const trimmedValue = value.trim();
    let isValid = true;
    if (rules.required) isValid = trimmedValue !== '' && isValid;
    if (rules.minLength)
      isValid = trimmedValue.length >= rules.minLength && isValid;
    if (rules.maxLength)
      isValid = trimmedValue.length <= rules.maxLength && isValid;
    return isValid;
  };

  inputChangedHandler = e => {
    const updatedOrderForm = { ...this.state.orderForm };
    // don't need to create complete deep clone; only to level we need to modify
    const updatedFormElement = { ...updatedOrderForm[e.target.name] };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[e.target.name] = updatedFormElement;

    // loop through input valid properties to determine when to disable Submit button
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid
    });
  };

  render() {
    // create an array from orderForm object
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            {...formElement.config}
            changed={this.inputChangedHandler}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    // display spinner while POST request processing
    if (this.state.loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

ContactData.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired
  }).isRequired,
  price: PropTypes.number.isRequired
};

export default ContactData;
