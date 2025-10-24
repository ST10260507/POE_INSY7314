const express = require("express");
 
// Import all auth controller functions including delete
const { registerClient, login, registerAdmin, getAdmins, deleteAdmin } = require("../controllers/authController"); 
const { registerRules, loginRules } = require("../utils/validator");

// Import auth middleware for protecting admin routes
const { protect, admin } = require("../middleware/authMiddleware");

// Import limiters from centralized middleware
const { registerLimiter, loginLimiter } = require("../middleware/rateLimiter");

const router = express.Router();
 
// Client registration route (public)
router.post("/register", registerLimiter, registerRules, registerClient); 

// Login route (public - for both clients and admins)
router.post("/login", loginLimiter, loginRules, login);

// Admin registration route (protected - only admins can create other admins)
router.post("/register-admin", protect, admin, registerLimiter, registerRules, registerAdmin);

// Get all admins route (protected - only admins can view admin list)
router.get("/admins", protect, admin, getAdmins);

// Delete admin route (protected - only admins can delete admins)
router.delete("/admins/:id", protect, admin, deleteAdmin);
 
module.exports = router;