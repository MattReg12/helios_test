import Redis from 'ioredis';

class RedisDB {
  constructor() {
    this.connection = new Redis(process.env.REDIS_URL)
  }

  getRecording = async function(key) {
    try {
      const data = await this.connection.call('JSON.GET', key);
      return data
    } catch (e) {
      console.error('Redis recording data fetch error:', e)
    }
  }

  addRecording = async function(key, value) {
    const keyExists = await this.sessionExists(key)
    if (keyExists) {
      this.#appendRecording(key, value)
    } else {
      this.#createRecording(key, value)
    }
  }

  sessionExists = async function(key) {
    try {
      const data = await this.connection.call('JSON.GET', key);
      return !!data 
    } catch (error) {
      console.error('Redis session fetch error:', error.message)
    }
  }

  #appendRecording(key, value) {
    try {
      this.connection.call('JSON.ARRAPPEND', key, '.events', value)
      console.log(`${key} additional events added to redis sucessfully`)
    } catch(error) {
      console.error(`Error appending events for ${key} in redis`, error.message)
    }
  }

  #createRecording(key, value) {
    try {
      this.connection.call('JSON.SET', key, '.', value)
      console.log(`${key} created and events added to redis sucessfully`)
    } catch (error) {
      console.error(`Error adding key and events for ${key} in redis`, error.message)
    }
  }
}

export default RedisDB
