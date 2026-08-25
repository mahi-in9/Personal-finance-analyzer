const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const error = new Error('No token provided');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(error.statusCode || 401).json({ message: error.message || 'Unauthorized' });
    }
}

module.exports = authMiddleware;