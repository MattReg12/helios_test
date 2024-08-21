const MongoListItem = require('../models/mongo_list');
const mongoListRouter = require('express').Router();

mongoListRouter.get('/', (req, res) => {
  MongoListItem
    .find({})
    .then((items) => {
      res.json(items)
    })
})

mongoListRouter.post('/', (req, res) => {
  const body = req.body

  const newMongoListItem = new MongoListItem({
    name: body.name
  })

  newMongoListItem.save()
    .then(() => {
      res.send(req.params.name)
    })
    .catch((e) => {
      res.send({'Unsucessful save! Yikes': e.message})
    })
})

module.exports = mongoListRouter;
