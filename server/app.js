import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';

// Routers
import userRouter from './routes/users.route.js';
import questionRouter from './routes/questions.route.js';
import answersRouter from './routes/answers.route.js';

const app = express();

dotenv.config();

// Middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://think-hive.vercel.app'],
    credentials: true
}));


// Routes
app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);
app.use('/api/answers', answersRouter);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log("Listening on port 5000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
