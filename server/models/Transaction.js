// server/models/Transaction.js
const mongoose = require("mongoose");

const CATEGORIES = [
    "food", "rent", "transport", "shopping",
    "entertainment", "bills", "health", "income", "other",
];

const transactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        description: { type: String, required: true, trim: true },
        amount: { type: Number, required: true }, // negative = expense, positive = income
        date: { type: Date, required: true },

        category: { type: String, enum: CATEGORIES, default: "other" },
        confidence: { type: Number, min: 0, max: 1, default: null }, // set by the LLM, null until categorized
        categorizedBy: { type: String, enum: ["llm", "user"], default: "llm" },

        source: { type: String, enum: ["manual", "csv", "pdf"], default: "manual" },
        rawText: { type: String }, // original statement line, kept for debugging/re-categorization

        // set to true once this transaction's embedding is stored in the vector collection
        embedded: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// speeds up the dashboard's "spend by category this month" queries
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);