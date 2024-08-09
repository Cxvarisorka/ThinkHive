import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        lowercase: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now  // Automatically set the date and time when the user is created
    },
    updatedAt: {
        type: Date,
        default: Date.now  // Automatically set the date and time when the user is updated
    },
    views: {
        type: Number,
        default: 0,  // Initialize views to 0
    },
    answersCount: {
        type: Number,
        default: 0
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Question = mongoose.model('Question', questionSchema, 'questions');

export default Question;