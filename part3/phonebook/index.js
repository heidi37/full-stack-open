const db = require("./db.json")

const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(db)
})

app.get('/info', (request, response) => {
  response.send('<p>Phonebook has info for ' + db.persons.length + ' people</p>' + new Date().toString())
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})