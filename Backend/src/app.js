// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// --- IMPORTS ---
const authRoutes = require("./routes/authRoutes");  
const detailsRoutes = require("./routes/detailsRoutes"); 
const transactionsRoute = require("./routes/transactionsRoute"); 

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
    origin: "https://localhost:5173",
    credentials: true
}));
 
app.use(express.json());


// --- ADDED ROOT ROUTE HANDLER ---
app.get('/', (req, res) => {
    // Provides a helpful message for anyone visiting the base URL
    res.status(200).json({ 
        message: 'Welcome to the Backend API!',
        endpoints: [
            '/api/auth', 
            '/api/details', 
            '/api/transactions'
        ]
    });
});
// ---------------------------------

// --- ROUTER CONNECTIONS ---
app.use("/api/auth", authRoutes); 
app.use("/api/details", detailsRoutes); 
app.use("/api/transactions", transactionsRoute); 

module.exports = app;