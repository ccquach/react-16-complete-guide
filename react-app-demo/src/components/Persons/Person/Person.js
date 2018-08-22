import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';

class Person extends Component {
  constructor(props) {
    super(props);
    console.log(`[Person.js] Inside constructor`, props);
  }

  componentWillMount = () => {
    console.log(`[Person.js] Inside componentWillMount`);
  };

  componentDidMount = () => {
    console.log(`[Person.js] Inside componentDidMount`);
    if (this.props.position === 0) this.inputElement.focus();
  };

  render() {
    console.log(`[Person.js] Inside render`);
    return (
      <Auxiliary>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          ref={inp => {
            this.inputElement = inp;
          }}
          type="text"
          value={this.props.name}
          onChange={this.props.changed}
        />
      </Auxiliary>
    );

    // return [
    //   <p onClick={this.props.click}>
    //     I'm {this.props.name} and I am {this.props.age} years old!
    //   </p>,
    //   <p>{this.props.children}</p>,
    //   <input
    //     type="text"
    //     value={this.props.name}
    //     onChange={this.props.changed}
    //   />
    // ];
  }
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired
};

export default withClass(Person, classes.Person);
