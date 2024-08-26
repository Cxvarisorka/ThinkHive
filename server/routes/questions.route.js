import express from "express";
import Question from "../model/questions.model.js";
import ViewLog from "../model/viewlog.model.js";

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
});

// Delete question endpoint
questionRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findByIdAndDelete(id);
        if(!question) return res.status(404).json({ message: 'Question not found' });
        res.status(204).json("Question deleted successfully");
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Update question endpoint
questionRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { question, description } = req.body;
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, { question, description }, { new: true });
        if(!updatedQuestion) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(updatedQuestion);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all questions endpoint
questionRouter.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get specific question endpoint
questionRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { accountId } = req.query; // Assume accountId is passed in the query

    try {
        const question = await Question.findById(id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        if (accountId) {
            // Logic to check if the user has already viewed this question
            const hasViewed = await ViewLog.findOne({ questionId: id, userId: accountId });
            if (!hasViewed) {
                await Question.findByIdAndUpdate(id, { $inc: { views: 1 } });
                await ViewLog.create({ questionId: id, userId: accountId });
            }
        } 

        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default questionRouter;