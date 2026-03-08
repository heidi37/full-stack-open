//Imports
require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

//Creates the Express app - a function that is used to create an Express application stored in the app variable:
const app = express()

let notes = []

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

//Sets up middleware (like JSON parsing, CORS, logging)
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

//Defines routes
app.get('/', (request, response) => {
  //the request is answered by using the send method of the response object.
  response.send('<h1>Hello People!!!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
  .then(note => {
    if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  })
  .catch(error => {
    console.log(error)
    response.status(500).end()
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

    note.save().then(savedNote => {
      response.json(savedNote);
    })

})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//Starts the server with app.listen()
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})