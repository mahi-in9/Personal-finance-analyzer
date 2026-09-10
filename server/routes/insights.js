const express = require("express")
const authMiddleware = require("../middleware/auth")
const { getInsights } = require("../controllers/insights")

const router = express.Router()

router.post("/", authMiddleware, getInsights)

module.exports = router