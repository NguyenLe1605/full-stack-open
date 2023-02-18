import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './service/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterStr, setFilter] = useState('');
  const [notifMessage, setNotifMessage] = useState(null);
  const [color, setColor] = useState('green');

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

  const setNotif = (notifMessage) => {
    setNotifMessage(notifMessage);
    setTimeout(() => {
      setNotifMessage(null);
    }, 5000);
    setColor('green');
  }

  const setStates = () => {
    setNewName('');
    setNewNumber('');
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const confirmedString = `${newName} is already added to phonebook,\
                             replace the old number with a new one?`;
    const existedPerson = persons.find(person => person.name === newName);
    if (existedPerson) {
      if (window.confirm(confirmedString)) {
        console.log(existedPerson);
        const changedPerson = {...existedPerson, number: newNumber};
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(
              person => person.id !== returnedPerson.id 
              ? person
              : returnedPerson
            ));
            setStates();
            setNotif(`Updated ${changedPerson.name}`);
          })
          .catch(error => {
            console.log(error);
            setNotif(`Information of ${changedPerson.name} has already been removed from the server`);
            setPersons(persons.filter(person => person.id !== changedPerson.id));
            setColor('red');
          }) 

      }
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
        setStates();
        setNotif(`Added ${newPerson.name}`);
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
          console.log(error);
          alert(`There is no person with the id of ${id}`);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} color={color}/>
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