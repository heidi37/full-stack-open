const Persons = ( { persons, filter } ) => {
  return (
    <div>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase())) {
          return (
            <p key={person.name}>{person.name}<br/>{person.number}</p>
          )
        } 
      })}
    </div>
  )
}

export default Persons
