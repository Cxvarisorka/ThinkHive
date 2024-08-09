import express from 'express';
import Answer from '../model/answers.model.js';

const answersRouter = express.Router();

// Answer add endpoint
answersRouter.post('/', async (req, res) => {
    const { answer, question, user } = req.body;
    try {
        // Add answer to the question
        const answerDoc = new Answer({ answer, question, user });
        await answerDoc.save();
        res.status(201).json(answerDoc);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all answers endpoint
answersRouter.get('/', async (req, res) => {
    try {
        const answers = await Answer.find();
        res.status(200).json(answers);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

export default answersRouter;