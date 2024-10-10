import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
const app = express();
import bodyParser from 'body-parser';
import psqlListRouter from './controllers/psql.js';
import indexRouter from './routes/index.js';


app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json())
app.use(cors());
app.use('/api/psql', psqlListRouter);
app.use('/api', indexRouter)


export default app
