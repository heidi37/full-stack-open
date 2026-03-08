require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')

const Person = require('./models/person')

let persons = []

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)


morgan.token('type', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(resource => id === resource.id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const now = new Date();
  response.send(`
    <p>Phonebook has info for ${data.length} people<p>
    <p>${now.toString()}</p>`)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * 10000) + 1,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(resource => id !== resource.id)
  if (id) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//Starts the server with app.listen()
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})