const Person = ({name, number}) => (
    <p>{name} {number}</p>
)

const Persons = ({persons}) => persons.map(
    person => <Person key={person.id} name={person.name} number={person.number} />
)

export default Persons;