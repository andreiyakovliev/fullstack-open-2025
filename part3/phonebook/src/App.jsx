import { useState } from "react"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import { useEffect } from "react";
import personService from './services/persons'
import axios from "axios";

const App = () => {

  const [persons, setPersons] = useState([])

  const [NewName, setNewName] = useState('');
  const [NewNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const filteredPerson = searchTerm
    ? persons.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : persons;


  const addNewContact = (event) => {
    event.preventDefault();

    const newObj = {
      name: NewName,
      number: NewNumber,
      id: String(persons.length + 1)
    }

    for (let i = 0; i < persons.length; i++) {
      const person = persons[i];

      if (person.name === NewName) {
        const confirmUpdate = window.confirm(`${NewName} is already added to phonebook, replace the old number with a new one?`);
        if (!confirmUpdate) {
          return;
        }
        // alert(`${NewName} is already added to phonebook`);
        // return;
        const updatedPerson = { ...person, number: NewNumber }
        personService
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('');
            setNewNumber('');
          })
        return;
      }
    }

    personService
      .create(newObj)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`Added ${returnedContact.name}`);

        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const handleDelete = (id, contactName) => {
    if (window.confirm(`Delete ${contactName}`)) {
      personService
        .remove(id)
        .then(response => {
          const updatedPersons = persons.filter((person) => person.id != id)
          setPersons(updatedPersons)
        })
        .catch(error => {
          setErrorMessage(`Information of ${contactName} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addNewContact}
        nameValue={NewName}
        numberValue={NewNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {filteredPerson.map(person =>
          <li key={person.id}>
            <Person key={person.id} person={person} />
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App