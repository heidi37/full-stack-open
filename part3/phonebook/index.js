const express = require('express')
const app = express()
app.use(express.json())

data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(data);
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = data.find(resource => id === resource.id)
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

  if (data.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * 10000) + 1,
    person: body.name,
    number: body.number
  }
  data = data.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  data = data.filter(resource => id !== resource.id)
  if (id) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

//Starts the server with app.listen()
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})