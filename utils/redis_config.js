import { Redis } from 'ioredis'
require('dotenv').config()


class RedisConfig {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL)
  }

  async consume(channel, callback) {
    await this.redis.subscribe(channel)
    this.redis.on('message', async(ch, message) => {
      if (channel == ch) {
        await callback(message)
      }
    })
  }

  async produce(channel, message) {
    await this.redis.publish(channel, message)
  }
}

module.exports = RedisConfig