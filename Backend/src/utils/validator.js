//src/utils/validator.js
const { body } = require("express-validator");
 
// Shared password strength rule (unchanged)
const passwordStrength = body("password")
  .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
  .matches(/[A-Za-z]/).withMessage("Password must include a letter")
  .matches(/\d/).withMessage("Password must include a number");
 
// -----------------------------------------------------------
// Register Rules: Validate ALL required User Model fields
// -----------------------------------------------------------
const registerRules = [
  // 💡 New: Validate fullName
  body("fullName")
    .trim().notEmpty().withMessage("Full name is required"),
 
  // 💡 New: Validate idNumber
  body("idNumber")
    .isString().withMessage("ID Number must be a string")
    .isLength({ min: 10 }).withMessage("ID Number must be at least 10 characters")
    .custom(value => {
        // Basic check to ensure it looks like a number
        if (!/^\d+$/.test(value)) {
            throw new Error('ID Number must only contain digits');
        }
        return true;
    }),
 
  // 💡 New: Validate accountNumber
  body("accountNumber")
    .isString().withMessage("Account Number must be a string")
    .isLength({ min: 5 }).withMessage("Account Number must be at least 5 characters")
    .custom(value => {
        // Basic check to ensure it looks like a number
        if (!/^\d+$/.test(value)) {
            throw new Error('Account Number must only contain digits');
        }
        return true;
    }),
 
  // Password validation (unchanged)
  passwordStrength
];
 
// -----------------------------------------------------------
// Login Rules: Use idNumber for login lookup
// -----------------------------------------------------------
const loginRules = [
  // 💡 Updated: Use idNumber instead of email for login identifier
  body("idNumber")
    .isString().withMessage("ID Number is required for login")
    .notEmpty().withMessage("ID Number cannot be empty"),
 
  // Password validation (simple check for login)
  body("password")
    .isString().notEmpty().withMessage("Password is required"),
];
 
module.exports = { registerRules, loginRules };
 

// const { body } = require("express-validator");

// // Regex definitions
// const fullNameRegex = /^[A-Za-z\s]+$/;      // letters and spaces only
// const idNumberRegex = /^\d{13}$/;           // exactly 13 digits
// const accountNumberRegex = /^\d+$/;         // numbers only
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // min 8 chars, letters and numbers

// // Full Name validation
// const fullNameField = body("fullName")
//   .trim()
//   .matches(fullNameRegex)
//   .withMessage("Full name must contain letters and spaces only")
//   .isLength({ min: 3, max: 50 })
//   .withMessage("Full name must be between 3 and 50 characters")
//   .escape();

// // ID Number validation
// const idNumberField = body("idNumber")
//   .trim()
//   .matches(idNumberRegex)
//   .withMessage("ID number must be exactly 13 digits")
//   .escape();

// // Account Number validation
// const accountNumberField = body("accountNumber")
//   .trim()
//   .matches(accountNumberRegex)
//   .withMessage("Account number must contain only numbers")
//   .isLength({ min: 4, max: 20 })
//   .withMessage("Account number must be between 4 and 20 digits")
//   .escape();

// // Password validation
// const passwordStrength = body("password")
//   .isString()
//   .matches(passwordRegex)
//   .withMessage("Password must be at least 8 characters and include at least one letter and one number")
//   .not()
//   .matches(/<|>|"|'/)
//   .withMessage("Invalid characters in password");

// // Register rules
// const registerRules = [fullNameField, idNumberField, accountNumberField, passwordStrength];

// // Login rules (by default, login uses ID number and password)
// const loginRules = [
//   body("idNumber")
//     .trim()
//     .matches(idNumberRegex)
//     .withMessage("ID number must be exactly 13 digits"),
//   body("password")
//     .isString()
//     .notEmpty()
//     .withMessage("Password is required")
// ];

// module.exports = { registerRules, loginRules };


// const { body } = require("express-validator");

// // Regex definitions
// const fullNameRegex = /^[A-Za-z\s]+$/;      // letters and spaces only
// const idNumberRegex = /^\d{13}$/;           // exactly 13 digits
// const accountNumberRegex = /^\d+$/;         // numbers only
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // min 8 chars, letters and numbers

// // Full Name validation
// const fullNameField = body("fullName")
//   .trim()
//   .matches(fullNameRegex)
//   .withMessage("Full name must contain letters and spaces only")
//   .isLength({ min: 3, max: 50 })
//   .withMessage("Full name must be between 3 and 50 characters")
//   .escape();

// // ID Number validation
// const idNumberField = body("idNumber")
//   .trim()
//   .matches(idNumberRegex)
//   .withMessage("ID number must be exactly 13 digits")
//   .escape();

// // Account Number validation
// const accountNumberField = body("accountNumber")
//   .trim()
//   .matches(accountNumberRegex)
//   .withMessage("Account number must contain only numbers")
//   .isLength({ min: 4, max: 20 })
//   .withMessage("Account number must be between 4 and 20 digits")
//   .escape();

// // Password validation
// const passwordStrength = body("password")
//   .isString()
//   .matches(passwordRegex)
//   .withMessage("Password must be at least 8 characters and include at least one letter and one number")
//   .not()
//   .matches(/<|>|"|'/)
//   .withMessage("Invalid characters in password");

// // Register rules
// const registerRules = [fullNameField, idNumberField, accountNumberField, passwordStrength];

// // Login rules (by default, login uses ID number and password)
// const loginRules = [
//   body("idNumber")
//     .trim()
//     .matches(idNumberRegex)
//     .withMessage("ID number must be exactly 13 digits"),
//   body("password")
//     .isString()
//     .notEmpty()
//     .withMessage("Password is required")
// ];

// module.exports = { registerRules, loginRules };
