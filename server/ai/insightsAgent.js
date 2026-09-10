const { createAgent } = require("langchain")
const { tool } = requrie("langchain")
const { z } = require("zod")
const mongoose = require("mongoose")
const Transaction = require("../models/Transaction")
const { getModel } = require("../ai/chatModel")

const spendByCategory = tool(
    async ({ userId, month }) => {
        const start = new Date(`${month}-01T00:00:00.000Z`);
        const end = new Date(start);
        end.setUTCMonth(end.getUTCMonth + 1)

        const results = await Transaction.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    date: { $gte: start, $lt: end },
                    amount: { $lt: 0 },
                },
            },
            { $group: { _id: "$category", total: { $sum: { $abs: "$amount" } } } },
            { sort: { total: -1 } }
        ])
        return JSON.stringify(results);
    },
    {
        name: "spend_by_category",
        description: "Get total spending per category for a given user and month (month format: YYYY-MM)",
        schema: z.object({ userId: z.string(), month: z.string() }),
    }
)


const incomeVsExpense = tool(
    async ({ userId, month }) => {
        const start = new Date(`${month}-01T00:00:00.000Z`);
        const end = new Date(start);
        end.setUTCMonth(end.getUTCMonth() + 1);

        const [result] = await Transaction.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), date: { $gte: start, $lt: end } } },
            {
                $group: {
                    _id: null,
                    income: { $sum: { $cond: [{ $gt: ["$amount", 0] }, "$amount", 0] } },
                    expense: { $sum: { $cond: [{ $lt: ["$amount", 0] }, { $abs: "$amount" }, 0] } },
                },
            },
        ]);
        return JSON.stringify(result || { income: 0, expense: 0 });
    },
    {
        name: "income_vs_expense",
        description: "Get total income and total expense for a given user and month (month format: YYYY-MM)",
        schema: z.object({ userId: z.string(), month: z.string() }),
    }
);


async function getInsightsAgent() {
    const model = await getModel();
    return createAgent({
        model,
        tools: [spendByCategory, incomeVsExpense],
        systemPrompt:
            "You are a budgeting assistant. Always call a tool to get real numbers before answering " +
            "— never guess or estimate spending yourself. Keep answers short, specific, and use rupee amounts.",
    });
}

module.exports = { getInsightsAgent };

