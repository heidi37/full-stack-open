import { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

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
      if (persons.some(person => person.name === newName))
      {
        alert(`${newName} is already added to the phonebook.`)
        return
      }
      setPersons((prev) => {
          return [...prev, { name: newName, number:newNumber }]
      })
      setNewName("")
      setNewNumber("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleChangeFilter} filter={filter}/>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addName} newName={newName} onChangeName={handleChangeName} newNumber={newNumber} onChangeNumber={handleChangeNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
