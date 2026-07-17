import "./src/config/env.js";
import path from 'path';
import hospitalRoute from './src/routes/hospitalRoute.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);
import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import chatRoute from './src/routes/chatRoute.js';
connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', chatRoute);
app.use('/api', hospitalRoute);

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
    console.log("LifeLineAI Backend Server is up and running!");
});
