// src/controllers/authController.js

const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure User model exists and is correct
const { validationResult } = require("express-validator");
// You will also need to have 'bcryptjs' installed for the User model's password hashing

// --- Helper Function ---
// function to generate jwt token for a logged in user
const generateToken = (user) => {

  const role = Array.isArray(user.roles) ? user.roles[0]?.role : user.role;

  return jwt.sign(
    { id: user._id, email: user.email, role: role }, 
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: "Invalid input", errors: errors.array() });

  const { email, password, fullName } = req.body; // Added fullName based on User model
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // Use default role 'user' (or 'reader' if you prefer)
    const user = await User.create({
      email,
      password,
      fullName: fullName || 'User', // Use fullName if provided
      role: 'user' 
    });

    const token = generateToken(user);
    res.status(201).json({ message: "User registered", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// 1.2. exports.adminCreateUser (Matches the 'adminCreateUser: registerAdmin' alias)
// This logic is designed for an admin creating a user with the 'admin' role.
exports.adminCreateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ message: "Invalid input", errors: errors.array() });

    try {
        // Validation check for existing admin is now handled by the protect and requireRole middleware 
        // on the route itself, so we just check for email existence and create the admin user.

        const { email, password, fullName } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const adminUser = await User.create({
            email,
            password,
            fullName: fullName || 'Admin',
            role: 'admin' // Force the 'admin' role
        });

        const token = generateToken(adminUser);
        res.status(201).json({ message: "Admin registered successfully", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error during admin registration" });
    }
};

// 1.3. exports.login (Matches the 'login' function)
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ message: "Invalid input", errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    // Check if user exists and password matches (using the method from the User model)
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
};

// You can optionally export the other functions if they are used elsewhere:
// exports.registerReader = exports.register; 
// exports.registerAdmin = exports.adminCreateUser; 
// exports.registerEditor = (req, res) => res.status(501).json({ message: "Editor registration not yet supported" });