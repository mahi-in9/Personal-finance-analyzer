const Transaction = require("../models/Transaction")
const { getModel } = require("./chatModel")

async function askAboutFinance(userId, question) {

    const transactions = await Transaction.find({ userId })
        .sort({ date: -1 })
        .limit(150)
        .lean()

    if (transactions.length === 0) {
        return "You don't have any transactions yet ― add some or upload a statement first.";
    }

    const context = transactions.
        map((t) => `${t.date.toISOString().slice(0, 10)} | ${t.description} | ${t.amount} | ${t.category}`)
        .join("\n");

    const model = await getModel()

    const response = await model.invoke([
        {
            role: "system",
            content:
                "You are a personal finance assistant. Answer using ONLY the transaction data given below. " +
                "If the data doesn't contain the answer, say so plainly instead of guessing. Keep answers short.",
        },
        {
            role: "user",
            content: `Transactions (date | description | amount | category):\n${context}\n\nQuestion: ${question}`,
        },
    ])
    return response.content;
}


module.exports = { askAboutFinance }