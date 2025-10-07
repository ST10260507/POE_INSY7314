const { body } = require("express-validator");

// Regex definitions
const fullNameRegex = /^[A-Za-z\s]+$/;      // letters and spaces only
const idNumberRegex = /^\d{13}$/;           // exactly 13 digits
const accountNumberRegex = /^\d+$/;         // numbers only
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // min 8 chars, letters and numbers

// Full Name validation
const fullNameField = body("fullName")
  .trim()
  .matches(fullNameRegex)
  .withMessage("Full name must contain letters and spaces only")
  .isLength({ min: 3, max: 50 })
  .withMessage("Full name must be between 3 and 50 characters")
  .escape();

// ID Number validation
const idNumberField = body("idNumber")
  .trim()
  .matches(idNumberRegex)
  .withMessage("ID number must be exactly 13 digits")
  .escape();

// Account Number validation
const accountNumberField = body("accountNumber")
  .trim()
  .matches(accountNumberRegex)
  .withMessage("Account number must contain only numbers")
  .isLength({ min: 4, max: 20 })
  .withMessage("Account number must be between 4 and 20 digits")
  .escape();

// Password validation
const passwordStrength = body("password")
  .isString()
  .matches(passwordRegex)
  .withMessage("Password must be at least 8 characters and include at least one letter and one number")
  .not()
  .matches(/<|>|"|'/)
  .withMessage("Invalid characters in password");

// Register rules
const registerRules = [fullNameField, idNumberField, accountNumberField, passwordStrength];

// Login rules (by default, login uses ID number and password)
const loginRules = [
  body("idNumber")
    .trim()
    .matches(idNumberRegex)
    .withMessage("ID number must be exactly 13 digits"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required")
];

module.exports = { registerRules, loginRules };
