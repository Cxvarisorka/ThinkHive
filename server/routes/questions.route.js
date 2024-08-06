import express from "express";
import Question from "../model/questions.model.js";

const questionRouter = express.Router();

// Question add endpoint
questionRouter.post('/', async (req, res) => {
    const { question, description, user } = req.body;
    try {
        const questionDoc = new Question({ question, description, user });
        await questionDoc.save();
        res.status(201).json(questionDoc);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
})

// Get all user questions endpoint
questionRouter.post('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const questions = await Question.find({ user: id });
        res.status(200).json(questions);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});


export default questionRouter;