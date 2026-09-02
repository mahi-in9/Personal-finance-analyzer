const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate JWT token
        const token = generateToken(newUser);

        res.status(201).json({ message: 'User registered successfully', data: { token } });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // Generate JWT token
        const token = generateToken(user);

        res.json({ message: 'Login successful', data: { token } });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication middleware
        const user = await User.findById(userId).select('-password'); // Exclude password from the response

        if (!user) {
            throw new Error('User not found');
        }

        res.json({ message: 'User profile retrieved successfully', data: user });
    }
    catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

module.exports = { register, login, getUserProfile };

