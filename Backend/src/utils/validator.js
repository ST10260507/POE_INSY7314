// src/utils/validator.js
const { body } = require("express-validator");

// Shared password strength rule (with whitelisted pattern)
const passwordStrength = body("password")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
  .matches(/^[A-Za-z0-9!@#$%^&*()_+=-]+$/).withMessage("Password contains invalid characters")
  .matches(/[A-Za-z]/).withMessage("Password must include a letter")
  .matches(/\d/).withMessage("Password must include a number");

// -----------------------------------------------------------
// Register Rules: Validate ALL required User Model fields
// -----------------------------------------------------------
const registerRules = [
  // Whitelist fullName (letters, spaces, hyphens only)
  body("fullName")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .matches(/^[A-Za-z\s'-]+$/).withMessage("Full name contains invalid characters"),

  // Whitelist ID Number (digits only)
  body("idNumber")
    .isString().withMessage("ID Number must be a string")
    .isLength({ min: 10, max: 13 }).withMessage("ID Number must be between 10 and 13 digits")
    .matches(/^\d+$/).withMessage("ID Number must only contain digits"),

  // Whitelist accountNumber (digits only)
  body("accountNumber")
    .isString().withMessage("Account Number must be a string")
    .isLength({ min: 5, max: 20 }).withMessage("Account Number must be between 5 and 20 digits")
    .matches(/^\d+$/).withMessage("Account Number must only contain digits"),

  // Password validation 
  passwordStrength
];

// -----------------------------------------------------------
// Login Rules
// -----------------------------------------------------------
const loginRules = [
  // Whitelist ID Number again for login
  body("idNumber")
    .isString().withMessage("ID Number is required for login")
    .notEmpty().withMessage("ID Number cannot be empty")
    .matches(/^\d+$/).withMessage("ID Number must only contain digits"),

  // Whitelist password
  body("password")
    .isString().notEmpty().withMessage("Password is required")
    .matches(/^[A-Za-z0-9!@#$%^&*()_+=-]+$/).withMessage("Password contains invalid characters")
];

module.exports = { registerRules, loginRules };
