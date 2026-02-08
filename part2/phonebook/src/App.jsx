import { useState } from "react"

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
    console.log(filter)
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
      <label htmlFor="filter">filter shown with </label>
      <input value={filter} type="text" id="filter" onChange={handleChangeFilter} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          <div>
          name: <input value={newName} onChange={handleChangeName} />
          </div>
          <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
          </div>
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        if (person.name.includes(filter)) {
          return (
            <p key={person.name}>{person.name}<br/>{person.number}</p>
          )
        } 
      })}
    </div>
  )
}

export default App
