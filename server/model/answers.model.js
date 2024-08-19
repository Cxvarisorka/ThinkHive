import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    answer: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required:true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Answer = mongoose.model('Answer', answerSchema, 'answers');

export default Answer;