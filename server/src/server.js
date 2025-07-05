import express from 'express';
import mongoose from 'mongoose';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';


const app = express();

connectDB() 

app.get("/",(req,res)=> res.send('testing...'))

app.listen(ENV.PORT,() => console.log(`servers is running on port ${ENV.PORT}`))  