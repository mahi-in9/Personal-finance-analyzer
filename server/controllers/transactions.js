const Transaction = require('../models/Transaction');

// Get all transactions
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
}

exports.createTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transaction = new Transaction({ text, amount });
        await transaction.save();
        res.status(201).json(transaction)
    } catch (error) {
        next(error);
    }
}

exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            const error = new Error('Transaction not found');
            error.statusCode = 404;
            throw error;
        }
        await transaction.remove();
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        next(error);
    }
}

exports.updateTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            const error = new Error('Transaction not found');
            error.statusCode = 404;
            throw error;
        }
        transaction.text = text || transaction.text;
        transaction.amount = amount || transaction.amount;
        await transaction.save();
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
}

exports.getTransactionById = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            const error = new Error('Transaction not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
}

