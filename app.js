const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const psqlListRouter = require('./controllers/psql.js');
const indexRouter = require('./routes/index.js')

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()) // for parsing application/json
app.use(cors());
app.use('/api/psql', psqlListRouter);
app.use('/api', indexRouter)
module.exports = app
