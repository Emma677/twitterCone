import express from 'express';
import cors from "cors"
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

// the import below handles authentication
import {clerkMiddleware} from "@clerk/express"

// routes
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"

const app = express();

app.use(cors())
app.use(express.json())

app.use(clerkMiddleware())


app.get("/",(req,res)=> res.send('testing...'))

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

// error handling middleware
app.use((err,req,res)=>{
    console.error("Unhandled error:", err);
    res.status(500).json({error: err.message || 'internal server error'})
})

connectDB() 
app.listen(ENV.PORT,() => console.log(`servers is running on port ${ENV.PORT}`))  