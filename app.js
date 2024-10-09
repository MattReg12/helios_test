const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const redisRouter = require('./controllers/redis')
const psqlListRouter = require('./controllers/psql.js');
const mongoListRouter = require('./controllers/mongo.js');

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()) // for parsing application/json
app.use(cors());
app.use('/api/redis', redisRouter);
app.use('/api/mongo', mongoListRouter);
app.use('/api/psql', psqlListRouter);

module.exports = app
