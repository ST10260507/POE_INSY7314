// Import Mongoose to connect to MongoDB (used later for database operations)
//const mongoose = require('mongoose');
const fs = require('fs');         // Node.js module for file system operations
const https = require('https');   // Node.js module for creating HTTPS server
const app = require('./app');
require('dotenv').config();

// Define the server port
// Standard HTTPS port is 443, but 5000 is fine for development
const PORT = process.env.PORT || 5000;

// Define the database connection URI
const DB_URI = process.env.DB_URI;

// Define paths to your generated SSL certificate and key
// Assuming these are in the 'ssl' folder relative to your server.js's execution context (the 'Backend' directory)
const privateKeyPath = './ssl/privatekey.pem';
const certificatePath = './ssl/certificate.pem';

try {
    // Read the key and certificate files synchronously
    const options = {
        key: fs.readFileSync(privateKeyPath),
        cert: fs.readFileSync(certificatePath)
    };
    
    const secureServer = https.createServer(options, app);
    
    secureServer.listen(PORT, () => {
        console.log(`SECURE SERVER STARTED: https://localhost:${PORT}`);
    });
    
    // Connect to the database
    // mongoose.connect(DB_URI)
    //     .then(() => {
    //         console.log('MongoDB Connected Successfully!');
            
    //         // Create the HTTPS server using Express app and SSL options
    //         const secureServer = https.createServer(options, app);
            
    //         // Start the HTTPS server
    //         secureServer.listen(PORT, () => {
    //             console.log(`Secure Server running on HTTPS port ${PORT}`);
    //             console.log(`Visit: https://localhost:${PORT}`);
    //         });
    //     })
    //     .catch((err) => {
    //         console.error('MongoDB connection error:', err);
    //         process.exit(1); 
    //     });

} catch (e) {
    console.error(`\n FATAL ERROR: Could not read SSL files.`);
    console.error(`Please ensure '${privateKeyPath}' and '${certificatePath}' exist in your project root.`);
    console.error(`Error details: ${e.message}\n`);
    process.exit(1);
}