import express from 'express';

import Answer from '../model/answers.model.js';
import Question from '../model/questions.model.js';

const answersRouter = express.Router();

// Answer add endpoint
answersRouter.post('/', async (req, res) => {
    const { answer, question, user } = req.body;
    console.log(question);
    try {
        // Add answer to the question
        const answerDoc = new Answer({ answer, question, user });
        const questionDoc = await Question.findByIdAndUpdate(question, { $inc: { answersCount: 1 } });
        await answerDoc.save();
        await questionDoc.save();
        res.status(201).json(answerDoc);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all answers endpoint
answersRouter.get('/', async (req, res) => {
    try {
        const answers = await Answer.find({});
        res.status(200).json(answers);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all specific question's answers endpoint
answersRouter.get('/question/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const answers = await Answer.find({ question: id }, {question: 0});
        console.log(answers);
        res.status(200).json(answers);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// update answers endpoint
answersRouter.put('/question/:id', async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;
    try {
        const answerDoc = await Answer.findByIdAndUpdate(id, { answer }, { new: true });
        if(!answerDoc) return res.status(404).json({ message: 'Answer not found' });
        res.status(200).json(answerDoc);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Delete answer endpoint
answersRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const answer = await Answer.findByIdAndDelete(id);
        if(!answer) return res.status(404).json({ message: 'Answer not found' });
        res.status(204).json("Answer deleted successfully");
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});


export default answersRouter;