import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterStr, setFilter] = useState('');

  useEffect(() => {
    console.log("Side effect");
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("Response fulfilled");
        setPersons(response.data);
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
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    } 
    const newPerson = {
      number: newNumber,
      name: newName,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterStr} setState={setFilter} />
      <h2>add a new</h2>
      <PersonForm handleForm={handleFormSubmit} inputFields={inputFields} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App