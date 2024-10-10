import express from 'express';
import cors from 'cors'
const app = express();
import bodyParser from 'body-parser';
import { psqlListRouter, redisRouter, s3Router }  from './src/routes/test_routes.js';
import indexRouter from './src/routes/index.js';


app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json())
app.use(cors());
app.use('/api/psql', psqlListRouter);
app.use('/api/s3', s3Router);
app.use('/api/redis', redisRouter);
app.use('/api', indexRouter)


export default app
