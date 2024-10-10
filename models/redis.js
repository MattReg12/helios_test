import Redis from 'ioredis';
import express from 'express'
const redisRouter = express.Router()
import { split_into_chunks, process_chunks, process_summaries } from './open_ai.js' //rewrite this line

let redis;

try {
  redis = new Redis(process.env.REDIS_URL);
  console.log('Connected to redis DB')
} catch {
  console.log("Error connecting to redis")
}

const sessionExists = async function(key) {
  try {
    const data = await redis.call('JSON.GET', key);
    return !!data 
  } catch (e) {
    console.error('Redis session fetch error:', e)
  }
}

const fetchRecording = async function(key) {
  try {
    const data = await redis.call('JSON.GET', key);
    return data
  } catch (e) {
    console.error('Redis recording data fetch error:', e)
  }
}

// split this into several methods
const addRecordingData = async function(key, data) {
  const keyExists = await sessionExists(key)
  if (keyExists) {
    try {
      redis.call('JSON.ARRAPPEND', key, '.events', data)
      console.log(`${key} additional events added to redis sucessfully`)
    } catch(e) {
      console.error(`Error appending events for ${key} in redis`)
    }
  } else {
    try {
      redis.call('JSON.SET', key, '.', data)
      console.log(`${key} created and events added to redis sucessfully`)
    } catch (e) {
      console.error(`Error adding key and events for ${key} in redis`)
    }
  }   
}

// These routes are only for testing in the initial phases
//
//
//
redisRouter.post('/', async (req, res) => {
  const session = req.body.sessionId
  const data = req.body.data
  if (!await redis.exists(session)) {
    redis.call('JSON.SET', session, '.', data)
  } else {
    redis.call('JSON.ARRAPPEND', session, '.events', JSON.stringify(JSON.parse(data).events))
  }
  res.send('ok')
})

redisRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const exists = await sessionExists(id)
  if (exists) {
    const db = await fetchRecording(id);
    const chunks = split_into_chunks(db)
    const summaries = await process_chunks(chunks)
    const mainSummary = await process_summaries(summaries)
    res.send(mainSummary)
  }
})

export default { fetchRecording, addRecordingData }
// module.exports = { fetchRecording, addRecordingData }
// module.exports = redisRouter