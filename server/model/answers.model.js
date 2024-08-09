import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    answer: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
})

const Answer = mongoose.model('Answer', answerSchema, 'answers');

export default Answer;