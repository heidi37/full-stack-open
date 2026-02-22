const db = require("./db.json")

const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(db)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})