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

  addRecording = async function(key, data) {
    const keyExists = await this.sessionExists(key)
    if (keyExists) {
      this.#appendRecordingData(key, data)
    } else {
      this.#createRecordingData(key, data)
    }
  }

  sessionExists = async function(key) {
    try {
      const data = await this.connection.call('JSON.GET', key);
      return !!data 
    } catch (e) {
      console.error('Redis session fetch error:', e.message)
    }
  }

  #appendRecordingData(key, data) {
    try {
      this.connection.call('JSON.ARRAPPEND', key, '.events', data)
      console.log(`${key} additional events added to redis sucessfully`)
    } catch(e) {
      console.error(`Error appending events for ${key} in redis`, e.message)
    }
  }

  #createRecordingData(key, data) {
    try {
      this.connection.call('JSON.SET', key, '.', data)
      console.log(`${key} created and events added to redis sucessfully`)
    } catch (e) {
      console.error(`Error adding key and events for ${key} in redis`, e.message)
    }
  }
}

export default RedisDB
