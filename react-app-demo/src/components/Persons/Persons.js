import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  constructor(props) {
    super(props);
    console.log(`[Persons.js] Inside constructor`, props);
    this.lastPersonRef = React.createRef();
  }

  componentWillMount = () => {
    console.log(`[Persons.js] Inside componentWillMount`);
  };

  componentDidMount = () => {
    console.log(`[Persons.js] Inside componentDidMount`);
    this.lastPersonRef.current.focus();
  };

  componentWillReceiveProps = nextProps => {
    console.log(
      `[UPDATE Persons.js] Inside componentWillReceiveProps`,
      nextProps
    );
  };

  /*
  Not necessary to implement shouldComponentUpdate method, nor is it necessary
  to extend PureComponent here, because App (parent) extends PureComponent,
  which ensures that this (child) component does not unnecessarily update.
  */
  shouldComponentUpdate = (nextProps, nextState) => {
    // console.log(
    //   `[UPDATE Persons.js] Inside shouldComponentUpdate`,
    //   nextProps,
    //   nextState
    // );
    // return (
    //   nextProps.persons !== this.props.persons ||
    //   nextProps.changed !== this.props.changed ||
    //   nextProps.click !== this.props.click
    // );
    return true;
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log(
      `[UPDATE Persons.js] Inside componentWillUpdate`,
      nextProps,
      nextState
    );
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log(`[Persons.js] Inside componentDidUpdate`, prevProps, prevState);
  };

  render() {
    console.log(`[Persons.js] Inside render`);
    return this.props.persons.map((person, index) => (
      <Person
        key={person.id}
        ref={this.lastPersonRef}
        position={index}
        name={person.name}
        age={person.age}
        click={this.props.clicked.bind(this, index)}
        changed={event => this.props.changed(event, person.id)}
      />
    ));
  }
}

export default Persons;
