// src/routes/authRoutes.js
 
const express = require("express");
 
// 💡 CHANGE: Destructure 'registerClient' instead of 'register'
const { registerClient, login } = require("../controllers/authController"); 
const { registerRules, loginRules } = require("../utils/validator");
const router = express.Router();
 
// Install express-rate-limit if you haven't
const rateLimit = require("express-rate-limit");
 
// Brute-force limiter for login
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // Max 20 requests per 10 minutes
  message: "Too many login attempts from this IP, please try again after 10 minutes"
});
 
// 💡 CHANGE: Use the imported function name 'registerClient'
router.post("/register", registerRules, registerClient); 
router.post("/login", loginLimiter, loginRules, login);
 
module.exports = router;
 

// const express = require("express");
// const { registerClient, login } = require("../controllers/authController");
// const { registerRules, loginRules } = require("../utils/validator"); // Import validation rules

// const router = express.Router();

// // Route for clients to register
// // Applies registration validation rules before calling the controller function
// router.post("/register", registerRules, registerClient);

// // Route for all users (clients and pre-saved admins) to log in
// // Login is standardized to use idNumber and password
// router.post("/login", loginRules, login);

// module.exports = router;

// // routes/authRoutes.js
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User.js"); 

// const router = express.Router();

// //reg a user
// router.post("/register", async (req, res) => {
//   try {
//     const { fullName, idNumber, accountNumber, password } = req.body;

// //check missing fields
//     if (!fullName || !idNumber || !accountNumber || !password) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // Check for existing user by ID number or account number
//     const existingUser = await User.findOne({
//       $or: [{ idNumber }, { accountNumber }],
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user document
//     const newUser = new User({
//       fullName,
//       idNumber,
//       accountNumber,
//       password: hashedPassword,
//       role: "client", // set default role
//     });

//     // Save to MongoDB
//     await newUser.save();

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         fullName: newUser.fullName,
//         idNumber: newUser.idNumber,
//         accountNumber: newUser.accountNumber,
//         role: newUser.role,
//       },
//     });
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// });

// //login
// router.post("/login", async (req, res) => {
//   try {
//     const { idNumber, password } = req.body;

//     // Find user by idNumber
//     const user = await User.findOne({ idNumber });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET || "your_jwt_secret",
//       { expiresIn: "1h" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         password: user.password,
//         accountNumber: user.accountNumber,
//         idNumber: user.idNumber,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

// module.exports = router;
