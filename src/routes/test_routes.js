import express from 'express'
import PSQL from '../controllers/psql.js'
import S3 from '../controllers/s3.js'
import RedisDB from '../controllers/redis_db.js'
import OpenAIInterface from '../models/open_ai.js'



export const redisRouter = express.Router()
export const psqlListRouter = express.Router()
export const s3Router = express.Router()

const psql = new PSQL()
const s3 = new S3()
const redisDB = new RedisDB()
const openAI = new OpenAIInterface()

// PSQL
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

//S3 

s3Router.get('/:id', async (req, res) => {
  const id = req.params.id
  const data = await s3.getFile(id);
  res.send(String(data))
})

s3Router.post('/', async (req, res) => {
  const body = req.body
  const location = await s3.addFile(body.key, body.data)
  res.send(location)
})

//Redis

redisRouter.post('/', async (req, res) => {
  const key = req.body.sessionId
  const data = req.body.data
  await redisDB.addRecording(key, data)
  res.send('ok')
})

redisRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const data = await redisDB.getRecording(id)
  res.send(await openAI.summarizeSession(data))
})
