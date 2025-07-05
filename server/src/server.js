import express from 'express';
import mongoose from 'mongoose';


const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT,() => console.log(`servers is running on port ${PORT}`))