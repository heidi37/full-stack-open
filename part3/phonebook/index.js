const db = require("./db.json")

const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(db)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = db.persons.find(person => person.id === id)
  if (person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  response.send('<p>Phonebook has info for ' + db.persons.length + ' people</p>' + new Date().toString())
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  db.persons = db.persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})