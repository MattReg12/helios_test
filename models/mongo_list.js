const mongoose = require('mongoose')

const mongoListSchema = new mongoose.Schema({
  name: String
})

module.exports =  mongoose.model('MongoListItem', mongoListSchema)
