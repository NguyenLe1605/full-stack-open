import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './service/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterStr, setFilter] = useState('');

  useEffect(() => {
    console.log("Side effect");
    personService
      .getAll()
      .then(initialPersons => {
        console.log("Response fulfilled");
        setPersons(initialPersons);
      })
    }, []);

  const personsToShow = persons.filter(
    person => person.name.toLowerCase().search(filterStr.toLowerCase()) != -1
  );

  const inputFields = [
    {
      text: 'name',
      value: newName,
      setState: setNewName,
    },
    {
      text: 'number',
      value: newNumber,
      setState: setNewNumber,
    }
  ]

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const confirmedString = `${newName} is already added to phonebook,\
                             replace the old number with a new one?`;
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(confirmedString)) {
        console.log('cool');
      }
      alert(`${newName} is already added to the phonebook`);
      return;
    } 
    const newPerson = {
      number: newNumber,
      name: newName,
      id: persons.length + 1,
    };

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
  }

  const handleDeleteClick = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      console.log(`Person with id of ${id} will be removed from the server`);
      personService
        .remove(id)
        .then(() => {
          const changedPersons = persons.filter(person => person.id !== id);
          setPersons(changedPersons);
        })
        .catch(error => {
          alert(`There is no person with the id of ${id}`);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterStr} setState={setFilter} />
      <h2>add a new</h2>
      <PersonForm 
        handleForm={handleFormSubmit} 
        inputFields={inputFields} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={personsToShow} 
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default App