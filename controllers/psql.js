const Pool = require('pg').Pool
const psqlListRouter = require('express').Router()
require('dotenv').config()

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_NAME,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
})

// await pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack);
//   }
//   client.query('SELECT NOW()', (err, result) => {
//     release();
//     if (err) {
//       return console.error('Error executing query', err.stack);
//     }
//     console.log('Connected to Postgres!!:', result.rows);
//     process.exit(0);
//   });
// });

psqlListRouter.get('/', (req, res) => {
  pool.query('SELECT * FROM recordings')
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
