const mongoose = require('mongoose')

//connect to MongoDB
const password = process.argv[2]

//const url = `mongodb+srv://hfryzell_db_user:${password}@cluster0.uwclkmr.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)