const { z } = require("zod")
const { getModel } = require("./chatModel")

const CATEGORIES = [
    "food", "rent", "transport", "shopping", "entertainment",
    "bills", "health", "income", "other"
]

const CategorySchema = z.object({
    category: z.enum(CATEGORIES),
    confidence: z.number().min(0).max(1),
})

async function categorizeTransaction(description, amount) {
    const model = await getModel();
    const categorizer = model.withStructuredOutput(CategorySchema)
    return categorizer.invoke(
        `Categorize this bank transaction into exactly one of the allowed categories.\n` +
        `Description: "${description}"\n` +
        `Amount: ${amount} (negative = money out, positive = money in)`
    );
}

module.exports = { categorizeTransaction, CATEGORIES }
