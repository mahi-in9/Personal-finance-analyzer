// server/models/ChatMessage.js
const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    // optional: which transaction IDs were retrieved to answer this (great for a "sources" UI later)
    retrievedTransactionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatMessage", chatMessageSchema);