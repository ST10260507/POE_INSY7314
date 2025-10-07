// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");

//generat jwt
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1h" }
  );
};

//reg user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ message: "Invalid input", errors: errors.array() });

  const { fullName, idNumber, accountNumber, password } = req.body;

  try {
    //check if user already exists
    const existing = await User.findOne({
      $or: [{ idNumber }, { accountNumber }],
    });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with role 'user'
    const newUser = new User({
      fullName,
      idNumber,
      accountNumber,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    // Let frontend handle redirect to login
    res.status(201).json({
      message: "Registration successful! Please log in.",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        idNumber: newUser.idNumber,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

//login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ message: "Invalid input", errors: errors.array() });

  const { idNumber, password } = req.body;

  try {
    const user = await User.findOne({ idNumber });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        idNumber: user.idNumber,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
