//Imports
const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
const notesRouter = require('./controllers/notes')

//Creates the Express app - a function that is used to create an Express application stored in the app variable:
const app = express()

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

//Sets up middleware (like JSON parsing, CORS, logging)
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))
app.use('/api/notes', notesRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//error handler
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

//Starts the server with app.listen()
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})