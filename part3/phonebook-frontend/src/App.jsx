import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from "./components/Notification"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [successStatus, setSuccessStatus] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    //Add post to database use event id
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Do you want to replace the number?`,
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person,
              ),
            )
            setSuccessStatus("success")
            setSuccessMessage(`${existingPerson.name} was successfully updated`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setNewName("")
            setNewNumber("")
          })
          .catch((error) => {
            setSuccessStatus("error")
            setSuccessMessage(
              `Information of ${existingPerson.name} has already been deleted.`,
            )
            setTimeout(() => {
              setSuccessMessage(null)
              setNewName("")
              setNewNumber("")
              setPersons(persons.filter((p) => p.id !== existingPerson.id))
            }, 5000)
          })
      }
      return
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons((prev) => {
        return [...prev, { ...returnedPerson }]
      })
      setSuccessStatus("success")
      setSuccessMessage(`${newName} was successfully added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      setNewName("")
      setNewNumber("")
    })
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteObj(person.id).then(() => {
        setSuccessStatus("success")
        setSuccessMessage(`${person.name} was successfully deleted`)
        setTimeout(() => {
          setSuccessMessage(null)
          setPersons(persons.filter((p) => p.id !== person.id))
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {successMessage && (
        <Notification
          successStatusClass={successStatus}
          message={successMessage}
        />
      )}
      <Filter onChange={handleChangeFilter} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        onChangeName={handleChangeName}
        newNumber={newNumber}
        onChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App
