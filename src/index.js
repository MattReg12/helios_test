const app = require('../app')
const port = 3000;
const Redis = require('ioredis')
require('dotenv').config()

// Needs to move to another file
// class RedisConfig {
//   constructor() {
//     this.redis = new Redis(process.env.REDIS_URL)
//   }

//   async consume(channel, callback) {
//     await this.redis.subscribe(channel)
//     this.redis.on('message', async(ch, message) => {
//       if (channel == ch) {
//         await callback(message)
//       }
//     })
//   }

//   async produce(channel, message) {
//     await this.redis.publish(channel, message)
//   }
// }

// const redis = new RedisConfig()
// redis.consume('__keyevent@0__:expired', (message) => {
//   console.log(`Message received on expired key channel: ${message}`)
// })



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Owl my eyes')
})

