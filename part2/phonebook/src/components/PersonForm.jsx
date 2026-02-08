const PersonForm = ( {onSubmit, newName, onChangeName, newNumber, onChangeNumber} ) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
          name: <input value={newName} onChange={onChangeName} />
          </div>
          <div>
          number: <input value={newNumber} onChange={onChangeNumber} />
          </div>
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
