import express from 'express'
const indexRouter = express.Router()
import RedisDB from '../controllers/redis_db.js'

const redisDB = new RedisDB()

indexRouter.get('/:id', async (req, res) => {
  const id = req.params.id // need to scrub id params here
  const data = await redisDB.getRecording(id)
  res.send(data)
})

// indexRouter.post('/:id', async (req, res) => {
//   const key = req.body.sessionId
//   const data = req.body.data
//   redisDB.addRecordingData(key, data)

// })

export default indexRouter