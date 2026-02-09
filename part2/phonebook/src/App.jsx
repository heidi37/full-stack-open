import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    console.log("effect")
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
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
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`)
      return
    }
    setPersons((prev) => {
      return [...prev, { name: newName, number: newNumber }]
    })
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
