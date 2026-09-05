const {
    getTransactions,
    createTransaction,
    deleteTransaction,
    updateTransaction,
    getTransactionById
} = require('../controllers/transactions');

const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth")

router.use(authMiddleware)

router.get('/', getTransactions);
router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);
router.put('/:id', updateTransaction);
router.get('/:id', getTransactionById);

module.exports = router;