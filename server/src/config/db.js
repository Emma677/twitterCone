import mongoose from "mongoose"
import { ENV } from "./env.js"


export const connectDB = async()=>{
    try {
        await mongoose.connect(ENV.MONGO_URI)
        console.log('Connected to database sucessfully')
    } catch (error) {
        console.log('error connecting to db',error)
        process.exit(1)
    }
}  