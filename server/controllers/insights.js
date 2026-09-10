const { getInsightsAgent } = require("../ai/insightsAgent")

const getInsights = async (req, res, next) => {
    try {
        const { month, question } = req.body;
        if (!month) {
            const error = new Error("month is required (format YYYY-MM)");
            error.statusCode = 400;
            throw error;
        }

        const agent = await getInsightsAgent();

        const userMessage = question || `Give me a short spending summary one saving suggestion for ${month}`;

        const result = await agent.invoke({
            messages: [{ role: "user", content: `My userId is ${req.user._id}. ${userMessage}` }]
        })

        const lastMessage = result.messages[result.messages.length - 1];
        res.status(200).json({ message: "Insights generated", data: lastMessage.content });
    } catch (error) {
        next(error);
    }
}

module.exports = { getInsights }