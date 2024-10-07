const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const redisRouter = require('./controllers/redis')
// const mongoose = require('mongoose');
// const config = require('./utils/config.js');
// const mongoListRouter = require('./controllers/mongo_list.js');
const psqlListRouter = require('./controllers/psql_list.js');

// mongoose.set('strictQuery', false);

// mongoose
//   .connect(config.MONGODB_URL)
//   .then(() => {
//     console.log('Successfully connected to DB.')
//   })
//   .catch((error) => {
//     console.log('Error connecting to DB.', error.message)
//   })
  

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()) // for parsing application/json
app.use(cors());
app.use('/api/redis', redisRouter);
app.use('/api/psql', psqlListRouter);

module.exports = app;
