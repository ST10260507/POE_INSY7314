// src/routes/authRoutes.js

const express = require("express");
const router = express.Router();

// Required for input validation
const { body, validationResult } = require("express-validator"); 

// --- CONTROLLER IMPORTS (You must create these functions in authController.js) ---
const {
  register: registerUser,
  adminCreateUser: registerAdmin,
  login,
} = require("../controllers/authController");

// --- MIDDLEWARE IMPORTS ---
const { protect, requireRole, ROLES } = require("../middleware/authMiddleware");

// --- VALIDATION HELPERS ---
const emailValidator = body("email")
  .isEmail()
  .withMessage("Valid email required")
  .normalizeEmail();

const passwordValidator = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 chars")
  .trim();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

// --- ROUTE DEFINITIONS ---

// POST /api/auth/register-user (Public: register a standard user)
router.post(
  "/register-user",
  // registerLimiter, // Add this back once you create the middleware
  emailValidator,
  passwordValidator,
  handleValidation,
  registerUser
);

// POST /api/auth/register-admin (Admin-only: register another user/admin)
router.post(
  "/register-admin",
  protect,
  requireRole(ROLES.ADMIN),
  // registerLimiter, // Add this back once you create the middleware
  emailValidator,
  passwordValidator,
  handleValidation,
  registerAdmin
);

// POST /api/auth/login (Public: login)
router.post(
  "/login",
  // loginLimiter, // Add this back once you create the middleware
  emailValidator,
  body("password").notEmpty().withMessage("Password required").trim(),
  handleValidation,
  login
);

// Export the router for use in app.js
module.exports = router;