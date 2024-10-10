import pg from 'pg'
const Pool = pg.Pool
import dotenv from 'dotenv'  // i dont really know why we need this here
dotenv.config() // i dont really know why we need this here

class PSQL {
  constructor() {
    this.connection = new Pool({
      user: process.env.PSQL_USER,
      host: process.env.PSQL_HOST,
      database: process.env.PSQL_NAME,
      password: process.env.PSQL_PASSWORD,
      port: process.env.PSQL_PORT,
      ssl: {
        rejectUnauthorized: false, // Use this if your RDS instance requires SSL and you're testing locally
      },
    })
  }

  async getSession(id) {
    try {
      const data = await this.connection.query('SELECT * FROM sessions WHERE session_id = ($1)', [id])
      return data.rows
    } catch(error) {
      console.error(`Error fetching session ${id} from PSQL`, error.message)
    }
  }
  // To be changed for actual data
  async addSession(id, data) {
    try {
      const data = await connection.query('INSERT INTO sessions (session_id, recording_data) VALUES ($1, $2) RETURNING *', 
        [Math.floor(Math.random()* 1000), JSON.stringify({ example: 'data'})])
      return data
    } catch(error) {
      console.error(`Error adding session ${id} to PSQL`, error.message)
    }
  }
}

export default PSQL
