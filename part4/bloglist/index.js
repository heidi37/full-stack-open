const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blog')

const app = express()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
