import app from '../app.js'
import RedisPubSub from './utils/redis_pubsub.js'

// const redis = new RedisPubSub()

// redis.consume('__keyevent@0__:expired', (message) => {
//   console.log(`Message received on expired key channel: ${message}`)
// })

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})

app.get('/', (req, res) => {
  res.send('Owl my eyes')
})

