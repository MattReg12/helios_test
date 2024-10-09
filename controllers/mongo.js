const MongoSession = require('../models/mongo_session');
const mongoSessionRouter = require('express').Router();
const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery', false);
console.log('attempting mongodb connection')
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Successfully connected to Mongo DB.')
  })
  .catch((error) => {
    console.log('Error connecting to DB.', error.message)
  })

mongoSessionRouter.get('/', (req, res) => {
  MongoSession
    .find({})
    .then((items) => {
      res.json(items)
    })
})

mongoSessionRouter.post('/', (req, res) => {
  const body = req.body

  const newMongoSession = new MongoSession({
    name: body.name
  })

  newMongoSession.save()
    .then(() => {
      res.send(req.params.name)
    })
    .catch((e) => {
      res.send({'Unsucessful save! Yikes': e.message})
    })
})

module.exports = mongoSessionRouter;
