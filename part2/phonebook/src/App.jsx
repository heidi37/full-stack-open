import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "555-111-222" }])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
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
      <h2>Phonebook</h2>
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
        return <p key={person.name}>{person.name}<br/>{person.number}</p>
      })}
    </div>
  )
}

export default App
