import express from 'express';
import User from '../model/users.model.js';
import bcrypt from 'bcrypt';
import Question from '../model/questions.model.js';
import Answer from '../model/answers.model.js';

const userRouter = express.Router();

// User registration endpoint
userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password using bcrypt with 10 salt rounds
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user in the database using the User model
        const user = await User.create({ username, email, passwordHash, createdAt: new Date(), updatedAt: new Date() });

        // Return a 201 status with the created user data
        res.status(201).json(user);
    } catch(err) {
        // If any error occurs during the process, return a 500 status with the error message
        res.status(500).json({ message: err.message });
    }
});

// User login endpoint
userRouter.post('/login', async (req, res) => {
    const { email, password} = req.body;

    console.log(email)

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if(!user) {
            // If user not found, return 404 status with a message
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if(!validPassword) {
            // If password is invalid, return 400 status with a message
            return res.status(400).json({ message: 'Invalid password' });
        }

        const returnInfo = await User.findOne({ email }, { passwordHash: 0 }) // Exclude hashed password from the response);

        // If login is successful, return 201 status with the user data
        res.status(201).json(returnInfo);
    } catch(err) {
        // If any error occurs during the process, return 500 status with the error message
        res.status(500).json({ message: err.message });
    }
});

// User get profile endpoint
userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(id, { passwordHash: 0 });  // Exclude hashed password from the response);
        if(!user) {
            // If user not found, return 404 status with a message
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get all users endpoint
userRouter.get('/', async (req, res) => {
    try {
        // Find all users in the database
        const users = await User.find({}, { passwordHash: 0 });  // Exclude hashed password from the response);
        res.status(200).json(users);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// User update profile endpoint
userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, bio } = req.body;

    // Create an object with only the fields that are provided in the request body
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (bio) updateFields.bio = bio;
    updateFields.updatedAt = new Date();

    try {
        // Update only the fields that are present in the updateFields object
        const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
        if (!user) {
            // If user not found, return 404 status with a message
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// User update password endpoint
userRouter.put('/:id/password', async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(id);
        if(!user) {
            // If user not found, return 404 status with a message
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare the provided current password with the hashed password in the database
        const validPassword = await bcrypt.compare(currentPassword, user.passwordHash);
        if(!validPassword) {
            // If password is invalid, return 400 status with a message
            return res.status(400).json({ message: 'Invalid current password' });
        }
        // Hash the new password using bcrypt with 10 salt rounds
        const passwordHash = await bcrypt.hash(newPassword, 10);
        // Update the user's passwordHash field
        user.passwordHash = passwordHash;
        await user.save();
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// User delete profile endpoint
userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        // Find the user by ID
        const user = User.findById(id);
        if(!user) {
            // If user not found, return 404 status with a message
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if(!validPassword) {
            // If password is invalid, return 400 status with a message
            return res.status(400).json({ message: 'Invalid password' });
        }
        const deletedUser = await user.remove();
        res.status(200).json(deletedUser);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user's questions endpoint
userRouter.get('/:id/questions', async (req, res) => {
    const { id } = req.params;
    try {
        const questions = await Question.find({ user: id });
        res.status(200).json(questions);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user's answers endpoint
userRouter.get('/:id/answers', async (req, res) => {
    const { id } = req.params;
    try {
        const answers = await Answer.find({ user: id });
        res.status(200).json(answers);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

userRouter.get('/', async (req, res) => {
    res.status(200).send('API is running...');
});

export default userRouter;