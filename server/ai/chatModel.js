const { initChatModel } = require("langchain");
const { process } = require("zod/v4/core");

let modelPromise;

function getModel() {
    if (!modelPromise) {
        modelPromise = initChatModel("google-genai:gemini-3.6-flash", {
            temperature: 0,
            apiKey: process.env.GOOGLE_API_KEY,
        })
    }
    return modelPromise
}

module.exports = { getModel }

