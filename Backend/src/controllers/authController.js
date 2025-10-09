//src/controllers/authController.js

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
    { expiresIn: "1h" }             // Token expires in 1 hour
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

// const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");
// const User = require("../models/User");

// // Helper function to generate JWT token
// const generateToken = (user) => {
//   // Only embed essential, non-sensitive data
//   const primaryRole = user.roles.length > 0 ? user.roles[0].role : 'client'; 
//   return jwt.sign(
//     { 
//       id: user._id, 
//       accountNumber: user.accountNumber, 
//       role: primaryRole // Use the primary role for simplicity in the token
//     },
//     process.env.JWT_SECRET || "your_jwt_secret_fallback", // Always use a secret from env in production!
//     { expiresIn: "1h" }
//   );
// };

// // ====================================================================
// // Client Registration (Public Access)
// // ====================================================================
// exports.registerClient = async (req, res) => {
//   // 1. Run validation checks from express-validator
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ 
//       message: "Validation failed.", 
//       errors: errors.array() 
//     });
//   }

//   const { accountNumber, idNumber, fullName, password } = req.body;
//   try {
//     // 2. Check for existing users by EITHER ID Number or Account Number
//     const existingUser = await User.findOne({
//       $or: [{ idNumber: idNumber }, { accountNumber: accountNumber }],
//     });

//     if (existingUser) {
//       const field = existingUser.idNumber === idNumber ? "ID Number" : "Account Number";
//       return res.status(409).json({ message: `${field} already registered.` });
//     }

//     // 3. Create the user. The model's pre-save hook handles password hashing automatically.
//     const user = await User.create({
//       accountNumber,
//       idNumber,
//       fullName,
//       password, // Plain text here, but hashed in the model
//       roles: [{ role: "client" }] // Explicitly assign the default role
//     });

//     // 4. Generate token and send response
//     const token = generateToken(user);
//     res.status(201).json({ 
//       message: "Client registered successfully.", 
//       token,
//       user: { id: user._id, fullName: user.fullName }
//     });
//   } catch (err) {
//     console.error("Registration Error:", err);
//     // 5. Handle unexpected server/database errors
//     res.status(500).json({ message: "Server error during registration.", error: err.message });
//   }
// };

// // ====================================================================
// // User Login (Public Access - used by both Client and Admin)
// // ====================================================================
// exports.login = async (req, res) => {
//   // 1. Run validation checks
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ 
//       message: "Validation failed.", 
//       errors: errors.array() 
//     });
//   }
  
//   // NOTE: Assuming login uses ID Number and Password based on validator.js
//   const { idNumber, password } = req.body; 
//   try {
//     // 2. Find user by unique ID Number
//     const user = await User.findOne({ idNumber });
    
//     // 3. Check if user exists
//     if (!user) {
//       return res.status(404).json({ message: "Invalid credentials" });
//     }

//     // 4. Compare password (uses the helper method in the User model)
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // 5. Generate token and send response
//     const token = generateToken(user);
//     res.json({ 
//       message: "Login successful", 
//       token, 
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         accountNumber: user.accountNumber,
//         role: user.roles[0].role // Primary role
//       }
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ message: "Server error during login." });
//   }
// };

// // // controllers/authController.js
// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");
// // const { validationResult } = require("express-validator");
// // const User = require("../models/User");

// // //generat jwt
// // const generateToken = (user) => {
// //   return jwt.sign(
// //     { id: user._id, role: user.role },
// //     process.env.JWT_SECRET || "your_jwt_secret",
// //     { expiresIn: "1h" }
// //   );
// // };

// // //reg user
// // exports.register = async (req, res) => {
// //   const errors = validationResult(req);
// //   if (!errors.isEmpty())
// //     return res
// //       .status(400)
// //       .json({ message: "Invalid input", errors: errors.array() });

// //   const { fullName, idNumber, accountNumber, password } = req.body;

// //   try {
// //     //check if user already exists
// //     const existing = await User.findOne({
// //       $or: [{ idNumber }, { accountNumber }],
// //     });
// //     if (existing) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Create new user with role 'user'
// //     const newUser = new User({
// //       fullName,
// //       idNumber,
// //       accountNumber,
// //       password: hashedPassword,
// //       role: "user",
// //     });

// //     await newUser.save();

// //     // Let frontend handle redirect to login
// //     res.status(201).json({
// //       message: "Registration successful! Please log in.",
// //       user: {
// //         id: newUser._id,
// //         fullName: newUser.fullName,
// //         idNumber: newUser.idNumber,
// //         role: newUser.role,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Registration error:", err);
// //     res.status(500).json({ message: "Server error during registration" });
// //   }
// // };

// // //login
// // exports.login = async (req, res) => {
// //   const errors = validationResult(req);
// //   if (!errors.isEmpty())
// //     return res
// //       .status(400)
// //       .json({ message: "Invalid input", errors: errors.array() });

// //   const { idNumber, password } = req.body;

// //   try {
// //     const user = await User.findOne({ idNumber });
// //     if (!user) {
// //       return res.status(400).json({ message: "User not found" });
// //     }

// //     // Compare password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     const token = generateToken(user);

// //     res.json({
// //       message: "Login successful",
// //       token,
// //       user: {
// //         id: user._id,
// //         fullName: user.fullName,
// //         idNumber: user.idNumber,
// //         role: user.role,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ message: "Server error during login" });
// //   }
// // };
