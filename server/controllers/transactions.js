const Transaction = require('../models/Transaction');

// Get all transactions
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json({ message: "transactions fetched successfully", data: transactions });
    } catch (error) {
        next(error);
    }
}

exports.createTransaction = async (req, res, next) => {
    try {
        const { description, text, amount, date, category, source } = req.body;
        const transaction = new Transaction({
            description: description || text,
            amount,
            date: date || new Date(),
            userId: req.user._id,
            category,
            source
        });
        await transaction.save();
        res.status(201).json({ message: "transaction created successfully", data: transaction })
    } catch (error) {
        next(error);
    }
}

exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById({ _id: req.params.id, userId: req.user._id });
        if (!transaction) {
            const error = new Error('Transaction not found or unauthorized');
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
        const { description, text, amount, data, category, source } = req.body;
        const transaction = await Transaction.findById({ _id: req.params.id, userId: req.user._id });
        if (!transaction) {
            const error = new Error('Transaction not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }
        transaction.description = description || text || transaction.description;
        transaction.amount = amount !== undefined ? amount : transaction.amount;
        transaction.date = date || transaction.date;

        if (category) transaction.category = category;

        await transaction.save();
        res.status(200).json({ message: "transaction updated successfully", data: transaction });
    } catch (error) {
        next(error);
    }
}

exports.getTransactionById = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById({ _id: req.params.id, userId: req.user._id });
        if (!transaction) {
            const error = new Error('Transaction not found or unauthorized');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "transaction fetched successfully", data: transaction });
    } catch (error) {
        next(error);
    }
}

