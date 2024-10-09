const Redis = require('ioredis');
const redisRouter = require('express').Router()
require('dotenv').config()
const { split_into_chunks, process_chunks, process_summaries }= require('./open_ai');

let redis;

try {
  redis = new Redis(process.env.REDIS_URL);
  console.log('Connected to redis DB')
} catch {
  console.log("Error connecting to redis")
}

const sessionExists = async function(id) {
  try {
    const data = await redis.call('JSON.GET', id);
    return !!data 
  } catch (e) {
    console.error('Redis session fetch error:', e)
  }
}

const getRecordingData = async function(id) {
  try {
    const data = await redis.call('JSON.GET', id);
    return data
  } catch (e) {
    console.error('Redis recording data fetch error:', e)
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
    const db = await getRecordingData(id);
    const chunks = split_into_chunks(db)
    const summaries = await process_chunks(chunks)
    const mainSummary = await process_summaries(summaries)
    res.send(mainSummary)
  }
})

module.exports = redisRouter