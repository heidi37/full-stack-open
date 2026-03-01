//Imports Express 

const express = require('express')
//Creates the Express app - a function that is used to create an Express application stored in the app variable:
const app = express()
app.use(express.json())


//Sets up middleware (like JSON parsing, CORS, logging)

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
//Defines routes (or imports route files)
//The first request parameter contains all of the information of the HTTP request
//the second response parameter is used to define how the request is responded to
app.get('/', (request, response) => {
  //the request is answered by using the send method of the response object.
  response.send('<h1>Hello World!!!</h1>')
})

app.get('/api/notes', (request, response) => {
  //The request is responded to with the json method of the response object
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

//Starts the server with app.listen()
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})