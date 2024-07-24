import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

// Middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://your-client-url.com'],
    credentials: true
}));

const app = express();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});