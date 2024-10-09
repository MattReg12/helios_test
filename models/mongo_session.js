const mongoose = require('mongoose')

const mongoSessionSchema = new mongoose.Schema({
  session_id: String,
  recording_data: Object
})

module.exports =  mongoose.model('MongoSession', mongoSessionSchema)
