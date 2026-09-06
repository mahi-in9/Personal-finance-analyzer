const express = require("express")
const multer = require("multer")

const authMiddleware = require("../middleware/auth")

const { upload: uploadHandler } = require("../controllers/upload")

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const ok = ["text/csv", "application/pdf"].includes(file.mimetype) ||
            file.originalname.toLowerCase().match(/\.(csv|pdf)$/);
        cb(ok ? null : new Error("Only csv and pdf files are supported"), ok)
    }
})

router.post("/", authMiddleware, upload.single("file"), uploadHandler)

module.exports = router;

