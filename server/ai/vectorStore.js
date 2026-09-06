const { MongoDBAtlasVectorSearch } = require("@langchain/mongodb")
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai")
const { MongoClient } = require("mongodb")

let vectorStorePromise;

function getVectorStore() {
    if (!vectorStorePromise) {
        const client = new MongoClient(process.env.MONGO_URI);
        const collection = client.db().collection("transaction_vectors");
        vectorStorePromise = new MongoDBAtlasVectorSearch(
            new GoogleGenerativeAIEmbeddings({ apiKey: process.env.GOOGLE_API_KEY, model: "text-embedding-004" }),
            { collection, indexName: "vector_index" }
        )
    }
    return vectorStorePromise;
}

module.exports = getVectorStore;