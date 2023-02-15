import { useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterStr, setFilter] = useState('');
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