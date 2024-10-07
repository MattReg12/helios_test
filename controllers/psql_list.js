const Pool = require('pg').Pool
const psqlListRouter = require('express').Router()
require('dotenv').config()

console.log(process.env.PSQL_USER)
console.log(process.env.PSQL_HOST)
console.log(process.env.PSQL_NAME)
console.log(process.env.PSQL_PASSWORD)
console.log(process.env.PSQL_PORT)

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_NAME,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: {
    rejectUnauthorized: false,     // Accept self-signed certificates
  },
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release(); // Release the client back to the pool
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connection successful:', result.rows);
    // Exit the process after successful connection
    process.exit(0);
  });
});


psqlListRouter.get('/', (req, res) => {
  pool.query('SELECT * FROM items')
    .then(result => {
      res.json(result.rows)
    })
})

psqlListRouter.post('/', (req, res) => {
  const name = req.body.name

  pool.query('INSERT INTO items (name) VALUES ($1) RETURNING *', [name])
    .then(result => {
      res.json(result.rows)
    })
    .catch(e => {
      res.send(`Theres an error. ${e.message}`)
    })
})

module.exports = psqlListRouter
