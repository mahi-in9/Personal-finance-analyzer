const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        default: 'INR',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
