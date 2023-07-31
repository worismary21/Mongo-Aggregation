import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {connectDatabase} from './config/database';


dotenv.config()

const app = express()

connectDatabase()

app.use(logger("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));



app.listen(process.env.PORT || 4000, () => {
    console.log(`app is listening on port ${process.env.PORT || 4000}`);
});

export default app;

