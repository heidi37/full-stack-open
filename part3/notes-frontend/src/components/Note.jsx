const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content} &nbsp;
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={() => deleteNote(note)}>Delete</button>
    </li>
  )
}

export default Note