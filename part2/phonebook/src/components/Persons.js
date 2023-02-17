const Person = ({person, handleDeleteClick}) => (
    <div>
        <span>{person.name} {person.number} </span>
        <button onClick={() => handleDeleteClick(person.id, person.name)}>delete</button>
    </div>
)

const Persons = ({persons, handleDeleteClick}) => persons.map(
    person => 
        <Person 
            key={person.id} 
            person={person}
            handleDeleteClick={handleDeleteClick}
        />
)

export default Persons;