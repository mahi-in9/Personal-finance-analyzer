const fs = require("fs")
const { parse } = require("csv-parse/sync")
const pdfParse = require("pdf-parse")
const Transaction = require("../models/Transaction")


function parseCsv(fiePath) {
    const content = fs.readFileSync(filePath, "utf-8")
    const records = parse(content, { columns: true, skip_empty_lines: true, trim: true });
    return records.map((r) => ({
        date: new Date(r.date || r.Date || r.transactionDate),
        description: r.description || r.Description || r.narration || r.Narration || "",
        amount: Number(r.amount || r.Amount || r.value),
    }))
}

async function parsePdf(filePath) {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    const lines = data.text.split("\n").filter(Boolean);

    const lineRegex = /(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(.+?)\s+(-?\d+(?:\.\d{1,2})?)\s*$/;
    const rows = [];

    for (const line of lines) {
        const match = line.match(lineRegex);
        if (match) {
            const [, dateStr, description, amountStr] = match;
            rows.push({ date: new Date(dateStr), description: description.trim(), amount: Number(amountStr) })
        }
    }
    return rows;
}


const upload = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error('No file uploaded');
            error.statusCode = 400;
            throw error;
        }

        const file = req.file;
        const isCsv = file.mimetype === "text/csv" || file.originalname.toLowerCase().endsWith(".csv");
        const isPdf = file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf");

        if (!isCsv && !isPdf) {
            fs.unlink(file.path, () => { });
            const error = new Error("Only CSV or PDF files are supported")
            error.statusCode = 400;
            throw error;
        }

        const rawRows = isCsv ? parseCsv(file.path) : await parsePdf(file.path)
        const validRows = rawRows.filter(
            (r) => r.description && !Number.isNaN(r.amount) && r.date instanceof Date && !Number.isNaN(r.date.getTime())
        )

        const saved = []

        for (const row of validRows) {


            const transaction = await Transaction.create({
                userId: req.user._id,
                description: row.description,
                amount: row.amount,
                date: row.date,
                category: "llm",
                confidence:"",
                categorizedBy: "llm",
                source: isCsv? "csv" : "pdf",
                rawText: raw.description,
            })

            saved.push(transaction)
        }

        fs.unlink(filePath, () => {});



        res.status(200).json({ message: `Imported ${saved.length} of ${rawRows.length} rows`,
            data: saved
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { upload }; 