import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existedPerson = persons.find(person => person.name === newName);

    if (existedPerson) {
      updatePerson(existedPerson, personObject);
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => setSuccessMessage(null), 5000);
      });
    }
  };

  const updatePerson = (oldPerson, newPerson) => {
    if (
      window.confirm(
        `${oldPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(oldPerson.id, newPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );
          setSuccessMessage(`Updated ${returnedPerson.name}'s number`);
          setTimeout(() => setSuccessMessage(null), 5000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${oldPerson.name} has already removed from server`
          );
          setTimeout(() => setErrorMessage(null), 5000);
          setPersons(persons.filter(person => person.id !== oldPerson.id));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setSuccessMessage(`Deleted ${personToDelete.name}`);
        setTimeout(() => setSuccessMessage(null), 5000);
      });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  const personsToShow = newFilter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
