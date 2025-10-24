// Import the jsonwebtoken package to create and verify JWT tokens
const jwt = require("jsonwebtoken");
// Import the User model to interact with the users collection in MongoDB
const User = require("../models/User");
// Import validationResult to check for validation errors
const { validationResult } = require("express-validator");
 
// Helper function to generate a JWT token using the user's ID
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, accountNumber: user.accountNumber, roles: user.roles },                  // Payload: we include the user ID
    process.env.JWT_SECRET,         // Secret key from .env file (must be kept private)
    { expiresIn: "1d" }             // Token expires in 1 day
  );
 
// Controller: handles user registration
exports.registerClient = async (req, res) => {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid input", errors: errors.array() });
    }
 
    const { fullName, accountNumber, idNumber, password } = req.body;
    try {
        // Check if the account already exists in the database
        const existing = await User.findOne({ accountNumber });
        if (existing) return res.status(409).json({ message: "Account already exists" });
 
        // Create a new user (password gets hashed via the pre-save hook in User.js)
        const user = await User.create({
            fullName,
            accountNumber,
            idNumber,
            password,
            roles: [{ TransactionId: null, role:"client"}]
         });
 
        // Generate a JWT token for the new user
        const token = generateToken(user);
 
        // Send back the token to the client
        res.status(201).json({ message: "client registered", token });
    } catch (err) {
        // Catch unexpected errors and return a generic server error response
        res.status(500).json({ error: "Server error: " + err });
    }
};

// Controller: handles admin registration (can only be done by existing admin)
exports.registerAdmin = async (req, res) => {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid input", errors: errors.array() });
    }
 
    const { fullName, accountNumber, idNumber, password } = req.body;
    try {
        // Check if the account already exists in the database
        const existing = await User.findOne({ accountNumber });
        if (existing) return res.status(409).json({ message: "Account already exists" });
 
        // Create a new admin user (password gets hashed via the pre-save hook in User.js)
        const user = await User.create({
            fullName,
            accountNumber,
            idNumber,
            password,
            roles: [{ TransactionId: null, role:"admin"}]
         });
 
        // Send back success message without token (admin doesn't auto-login the new admin)
        res.status(201).json({ message: "Admin registered successfully", admin: { fullName: user.fullName, accountNumber: user.accountNumber } });
    } catch (err) {
        // Catch unexpected errors and return a generic server error response
        res.status(500).json({ error: "Server error: " + err });
    }
};

// Controller: get all admins (can only be accessed by admin)
exports.getAdmins = async (req, res) => {
    try {
        // Find all users that have the admin role
        const admins = await User.find({ "roles.role": "admin" })
            .select('fullName accountNumber idNumber createdAt') // Only return necessary fields
            .sort({ createdAt: -1 }); // Sort by newest first
 
        res.status(200).json({ admins });
    } catch (err) {
        // Catch unexpected errors and return a generic server error response
        res.status(500).json({ error: "Server error: " + err });
    }
};

// Controller: delete an admin (can only be accessed by admin)
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the user to check if they're an admin
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: "Admin not found" });
        }
        
        // Check if the user is actually an admin
        const isAdmin = user.roles.some(r => r.role === "admin");
        if (!isAdmin) {
            return res.status(400).json({ message: "User is not an admin" });
        }
        
        // Delete the admin
        await User.findByIdAndDelete(id);
        
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
        // Catch unexpected errors and return a generic server error response
        res.status(500).json({ error: "Server error: " + err });
    }
};
 
// Controller: Handles user login
exports.login = async (req, res) => {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid input", errors: errors.array() });
    }
 
    const {fullName, accountNumber, idNumber, password } = req.body;
    try {
        // Look for a user with the given account
        const user = await User.findOne({ accountNumber });
 
        // If user not found or password is incorrect, return a generic error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
 
        // If login is successful, generate a JWT token
        const token = generateToken(user);
 
        // Send the token back to the client
        res.json({ token });
    } catch (err) {
        // Catch unexpected errors and return a generic server error response
        res.status(500).json({ error: "Server error" });
    }
};