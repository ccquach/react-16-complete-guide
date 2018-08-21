import React from 'react';

import Person from './Person/Person';

const Persons = props =>
  props.persons.map((person, index) => (
    <Person
      key={person.id}
      name={person.name}
      age={person.age}
      click={props.clicked.bind(this, index)}
      changed={event => props.changed(event, person.id)}
    />
  ));

export default Persons;
