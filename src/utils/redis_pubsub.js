import Redis from 'ioredis'

// This provides functionaliyu to interact with the redis pub/sub mechanism. 
class RedisPubSub {
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
  // Send a message to a specific channel. 
  async produce(channel, message) {
    await this.redis.publish(channel, message)
  }
}

export default RedisPubSub