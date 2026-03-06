const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <div key={person.id}>
              <p>
                {person.name}
                <br />
                {person.number}{" "}
                <button onClick={() => handleDelete(person)}>delete</button>
              </p>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Persons
