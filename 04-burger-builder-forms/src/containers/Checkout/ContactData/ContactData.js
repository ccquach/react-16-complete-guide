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
        label: 'Name'
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'street',
          placeholder: 'Street'
        },
        value: '',
        label: 'Street'
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'zipCode',
          placeholder: 'Zip Code'
        },
        value: '',
        label: 'Zip Code'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          name: 'country',
          placeholder: 'Country'
        },
        value: '',
        label: 'Country'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        label: 'Email'
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
        value: '',
        label: 'Delivery Method'
      }
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    // TODO: order object will contain form data
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2)
    };
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

  inputChangedHandler = e => {
    const updatedOrderForm = { ...this.state.orderForm };
    // don't need to create complete deep clone; only to level we need to modify
    const updatedFormElement = { ...updatedOrderForm[e.target.name] };
    updatedFormElement.value = e.target.value;
    updatedOrderForm[e.target.name] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            {...formElement.config}
            changed={this.inputChangedHandler}
          />
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>
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
