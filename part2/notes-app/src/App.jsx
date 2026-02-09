import { useState, useEffect } from "react"
import axios from "axios"
import Note from "./components/Note"

const App = (props) => {
  const [notes, setNotes] = useState([])
  //The App component now controls the behavior of the input element
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    console.log("effect")
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled")
      setNotes(response.data)
    })
  }, [])

  console.log("render", notes.length, "notes")

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    setNotes((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          content: newNote,
          important: Math.random() < 0.5,
        },
      ]
    })
    setNewNote("")
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll((prev) => !prev)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
