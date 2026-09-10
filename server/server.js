require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/DB');

const authRouter = require('./routes/auth');
const transactionsRouter = require('./routes/transactions');
const uploadRouter = require("./routes/upload");
const insightsRouter = require("./routes/insights")
const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
));

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/insights', insightsRouter)

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
