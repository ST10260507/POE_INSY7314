// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const authRoutes = require("./routes/authRoutes");  
const detailsRoutes = require("./routes/detailsRoutes"); 
const transactionsRoutes = require("./routes/transactionsRoutes");



dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// test route
app.get('/test', (req, res) => {
  res.json({ message: 'This is the JSON response' });
});

app.use("/api/auth", authRoutes);       // for login/register
app.use("/api/details", detailsRoutes); // for banking details
app.use("/api/transactions", transactionsRoutes);

module.exports = app;