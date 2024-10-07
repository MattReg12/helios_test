const Redis = require('ioredis');
const redisRouter = require('express').Router()
const { split_into_chunks, process_chunks, process_summaries }= require('./open_ai')

let redis;

try {
  redis = new Redis('redis://default:4MA0zipt3kCwkdrrvnsz0kPXi62I4HjB@redis-11913.c82.us-east-1-2.ec2.redns.redis-cloud.com:11913');
  console.log('Connected to redis DB!!!')
} catch {
  console.log("error connecting to redis")
}


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
  const db = await redis.call('JSON.GET', id);
  const chunks = split_into_chunks(db)
  const summaries = await process_chunks(chunks)
  const mainSummary = await process_summaries(summaries)
  res.send(mainSummary)
})

module.exports = redisRouter