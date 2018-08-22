import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Auxiliary from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { id: 'asdf123a', name: 'Max', age: 28 },
        { id: 'jlkdjf93', name: 'Manu', age: 29 },
        { id: '38dj9fdw', name: 'Stephanie', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    };
    console.log(`[App.js] Inside Contructor`, props);
  }

  componentWillMount = () => {
    console.log(`[App.js] Inside componentWillMount`);
  };

  componentDidMount = () => {
    console.log(`[App.js] Inside componentDidMount`);
  };

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   console.log(
  //     `[UPDATE App.js] Inside shouldComponentUpdate`,
  //     nextProps,
  //     nextState
  //   );
  //   return (
  //     nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons
  //   );
  //   // return true;
  // };

  componentWillUpdate = (nextProps, nextState) => {
    console.log(
      `[UPDATE App.js] Inside componentWillUpdate`,
      nextProps,
      nextState
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      `[UPDATE App.js] Inside getDerivedStateFromProps`,
      nextProps,
      prevState
    );
    return prevState;
  }

  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    console.log(
      `[UPDATE App.js] Inside getSnapshotBeforeUpdate`,
      prevProps,
      prevState
    );
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log(`[App.js] Inside componentDidUpdate`, prevProps, prevState);
  };

  // state = {
  //   persons: [
  //     { id: 'asdf123a', name: 'Max', age: 28 },
  //     { id: 'jlkdjf93', name: 'Manu', age: 29 },
  //     { id: '38dj9fdw', name: 'Stephanie', age: 26 }
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false
  // };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    // const person = Object.assign({}, this.state.persons[personIndex]);
    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => ({
      showPersons: !doesShow,
      toggleClicked: prevState.toggleClicked + 1
    }));
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log(`[App.js] Inside render`);
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          // isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Auxiliary>
        <button
          onClick={() => {
            this.setState({ showPersons: true });
          }}
        >
          Show Persons
        </button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler}
        />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);
