const express = require('express')
const mongoose = require('mongoose')
<<<<<<< HEAD
require('dotenv').config()
=======
>>>>>>> 1f1cf5d63bcacbca600e63ade519e5e74b511b04

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

<<<<<<< HEAD
const PORT = process.env.PORT
=======
const PORT = 3003
>>>>>>> 1f1cf5d63bcacbca600e63ade519e5e74b511b04
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
