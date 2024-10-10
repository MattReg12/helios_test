import express from 'express'
const psqlListRouter = express.Router()
import PSQL from '../controllers/psql.js'

const psql = new PSQL()

//Test
psqlListRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const data = await psql.getSession(id)
  res.send(data)
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