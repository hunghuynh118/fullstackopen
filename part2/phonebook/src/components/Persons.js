const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Persons = ({ personsToShow }) => (
  <div>
    {personsToShow.map(person => (
      <Person key={person.id} person={person} />
    ))}
  </div>
);

export default Persons;
