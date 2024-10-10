import pg from 'pg'
const Pool = pg.Pool
import express from 'express'
const psqlListRouter = express.Router()
import dotenv from 'dotenv'  // i dont really know why we need this here
dotenv.config() // i dont really know why we need this here

const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_NAME,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: {
    rejectUnauthorized: false, // Use this if your RDS instance requires SSL and you're testing locally
  },
})


psqlListRouter.get('/', (req, res) => {
  pool.query('SELECT * FROM sessions')
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

export default psqlListRouter
