require('dotenv').config();


const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);


// error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

