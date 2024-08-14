import mongoose from "mongoose";

const ViewLogSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    viewedAt: {
        type: Date,
        default: Date.now,
    },
});

const ViewLog = mongoose.model('ViewLog', ViewLogSchema);
export default ViewLog;
