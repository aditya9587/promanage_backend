import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config();

import { userRouter } from './routes/index.js';

const app = express();
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("database is connected");
})

app.get("/",(req,res)=>{
  res.send("Everthing is fine");
})

app.use("/api/v1", userRouter)

app.listen(process.env.PORT, ()=>{
  console.log("server is runnig")
})
