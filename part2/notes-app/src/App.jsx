import Note from "./components/Note"
import { useState, useEffect } from "react"


const fetchNotes = async () => {
  try {
    const res = await fetch("http://localhost:3001/notes");
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const App = () => {

  const [notes, setNotes] = useState([])
  //The App component now controls the behavior of the input element
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const getNotes = async () => {
      const data = await fetchNotes();
      if (data) setNotes(data);
    };

    getNotes();
  }, []);

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
        <button onClick={() => setShowAll(prev => !prev)}>
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
