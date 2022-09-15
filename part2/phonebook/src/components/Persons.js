import Person from './Person';

const Persons = ({ personsToShow, handleDelete }) => (
  <div>
    {personsToShow.map(person => (
      <Person key={person.id} person={person} handleDelete={handleDelete} />
    ))}
  </div>
);

export default Persons;
