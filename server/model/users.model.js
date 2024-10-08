import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true  // Remove leading and trailing whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,  // Remove leading and trailing whitespace
        lowercase: true  // Convert email to lowercase
    },
    bio: {
        type: String,
        required: false,
        trim: true,  // Remove leading and trailing whitespace,
        lowercase: true  // Convert bio to lowercase
    },
    passwordHash: {
        type: String,
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
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
})


const User = mongoose.model('User', userSchema, 'users');

export default User;
