const Pool = require('pg').Pool
const psqlListRouter = require('express').Router()

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'postgres_lists_items',
  password: 'password',
  port: 5432
})

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
