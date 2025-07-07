import express from 'express';
import cors from "cors"
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { arcjetMiddleware } from './middleware/arcjet.middleware.js';

// the import below handles authentication 
import {clerkMiddleware} from "@clerk/express"

// routes
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comments.routes.js"
import notificationRoutes from "./routes/notification.route.js"

const app = express();

app.use(cors()) 
app.use(express.json())

app.use(clerkMiddleware()) 
app.use(arcjetMiddleware)


app.get("/",(req,res)=> res.send('testing...'))

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes) 
app.use("/api/notification",notificationRoutes)

// error handling middleware
app.use((err,req,res)=>{
    console.error("Unhandled error:", err);
    res.status(500).json({error: err.message || 'internal server error'})
})

connectDB() 
app.listen(ENV.PORT,() => console.log(`servers is running on port ${ENV.PORT}`))  