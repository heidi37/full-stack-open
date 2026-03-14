const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const blogsRouter = require('./controllers/blog')

const app = express()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app