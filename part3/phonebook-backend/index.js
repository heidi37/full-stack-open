require("dotenv").config()
const express = require("express")
const app = express()
var morgan = require("morgan")

const Person = require("./models/person")

let persons = []

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)

morgan.token("type", function (req, res) {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type"),
)
app.use(express.static("dist"))

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id
  const person = Person.findById(id)
  .then((person) => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.get("/info", (request, response) => {
  Person.countDocuments({}).then(count => {
    const now = new Date()
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${now}</p>
    `)
  })
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

//error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

//Starts the server with app.listen()
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
