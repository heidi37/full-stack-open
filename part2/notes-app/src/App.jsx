import { useState, useEffect } from "react"
import noteService from "./services/notes"
import Note from "./components/Note"

const App = (props) => {
  const [notes, setNotes] = useState([])
  //The App component now controls the behavior of the input element
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response.data)
    })
  }, [])

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(noteObject).then((response) => {
      setNotes(notes.concat(response.data))
      setNewNote("")
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id === id ? response.data : note)))
    })
  }

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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
