// Backend/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require("./routes/authRoutes");  
const detailsRoutes = require("./routes/detailsRoutes"); 

dotenv.config();

const app = express();

// Parse JSON and CSP reports sent by the browser
app.use(express.json({ type: ["application/json", "application/csp-report"] }));

// CORS - allow your frontend dev origins
app.use(cors({
    origin: ["http://localhost:5173", "https://localhost:5173", "http://localhost:3000"],
    credentials: true
}));

// Helmet baseline security headers
app.use(helmet());

// Enable trust proxy so rate limiting works behind proxies/load balancers
app.set("trust proxy", 1);

// Content Security Policy directives
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:"],
  connectSrc: [
    "'self'",
    "http://localhost:5173",
    "https://localhost:5173",
    "http://localhost:5000",
    "https://localhost:5000",
    "ws://localhost:5173",
    "wss://localhost:5173"
  ],
  fontSrc: ["'self'"],
  objectSrc: ["'none'"],
  frameAncestors: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
  upgradeInsecureRequests: []
};

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      ...cspDirectives,
      "report-uri": ["/csp-report"],
    },
    reportOnly: process.env.NODE_ENV !== "production",
  })
);

// Endpoint to accept CSP violation reports from browsers
app.post("/csp-report", (req, res) => {
  console.log("CSP Violation Report:", JSON.stringify(req.body, null, 2));
  res.sendStatus(204);
});

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/details", detailsRoutes);

module.exports = app;