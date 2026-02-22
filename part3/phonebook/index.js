const db = require("./db.json")

const express = require('express')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)

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

app.post('/api/persons', (request, response) => {
  function generateId () {
    return Math.floor(Math.random() * 100000 + 1)
  }
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

 const exists = db.persons.find(person => person.name === body.name)
 if (exists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
 }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  db.persons = db.persons.concat(person)

  response.json(person)
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