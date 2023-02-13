import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    } 
    const newPerson = {
      name: newName,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(
        person => <p key={person.id}>{person.name}</p>
      )}
    </div>
  )
}

export default App