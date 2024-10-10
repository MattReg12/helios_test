import express from 'express'
const indexRouter = express.Router()
import redis from '../controllers/redis.js'


indexRouter.get('/:id', async (req, res) => {
  const id = req.params.id // need to scrub id params here
  const data = await redis.fetchRecording(id)
  res.send(data)
})

indexRouter.post('/:id', async (req, res) => {
  const key = req.body.sessionId
  const data = req.body.data
  redis.addRecordingData(key, data)

})

export default indexRouter