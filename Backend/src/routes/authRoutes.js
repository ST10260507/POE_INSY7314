// const express = require("express");
// const router = express.Router();

// const { body, validationResult } = require("express-validator");
// const { registerLimiter, loginLimiter } = require("../middleware/rateLimiter");

// const {
//   register: registerUser,
//   adminCreateUser: registerAdmin,
//   login,
// } = require("../controllers/authController");

// const { protect } = require("../middleware/authMiddleware");
// const { requireRole, ROLES } = require("../middleware/roles");

// // Validation helpers
// const emailValidator = body("email")
//   .isEmail()
//   .withMessage("Valid email required")
//   .normalizeEmail();

// const passwordValidator = body("password")
//   .isLength({ min: 8 })
//   .withMessage("Password must be at least 8 chars")
//   .trim();

// const handleValidation = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ errors: errors.array() });
//   next();
// };

// // Public: register user
// router.post(
//   "/register-user",
//   registerLimiter,
//   emailValidator,
//   passwordValidator,
//   handleValidation,
//   registerUser
// );

// // Admin-only: register another user
// router.post(
//   "/register-admin",
//   protect,
//   requireRole(ROLES.ADMIN),
//   registerLimiter,
//   emailValidator,
//   passwordValidator,
//   handleValidation,
//   registerAdmin
// );

// // Public: login
// router.post(
//   "/login",
//   loginLimiter,
//   emailValidator,
//   body("password").notEmpty().withMessage("Password required").trim(),
//   handleValidation,
//   login
// );

// module.exports = router;


// // import express from "express";
// // import { body } from "express-validator";
// // import { register, login, createUserWithRole } from "../controllers/authController.js";
// // import { protect, requireRole, requireSelfOrRole } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // Register & login
// // router.post("/register", body("email").isEmail(), body("password").isLength({ min: 6 }), register);
// // router.post("/login", body("email").isEmail(), body("password").exists(), login);

// // // Admin-only: create user with specific role
// // router.post("/create", protect, requireRole("admin"), createUserWithRole);

// // // Update own profile or admin
// // router.put("/:id", protect, requireSelfOrRole("id", ["admin"]), (req, res) => {
// //   res.json({ message: "Profile updated" });
// // });

// // export default router;


// // import express from "express";
// // import { protect, requireRole, requireSelfOrRole } from "../middleware/authMiddleware.js";
// // import { createUserWithRole } from "../controllers/authController.js";

// // const router = express.Router();

// // // Admin-only: create a user with specific role
// // router.post("/create", protect, requireRole("admin"), createUserWithRole);

// // // Example: user can update their own profile OR an admin can update anyone’s
// // router.put("/:id", protect, requireSelfOrRole("id", ["admin"]), (req, res) => {
// //   res.json({ message: "Profile updated" });
// // });

// // export default router;


// // // const router = require("express").Router();
// // // const { registerRules, loginRules } = require("../utils/validators");
// // // const authController = require("../controllers/authController");
// // // const rateLimit = require("express-rate-limit");

// // // // Brute-force limiter for login
// // // const loginLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20 });

// // // router.post("/register", registerRules, authController.register);
// // // router.post("/login", loginLimiter, loginRules, authController.login);

// // // module.exports = router;

// // // // const express = require("express");
// // // // const { register, login } = require("../controllers/authController");
// // // // const router = express.Router();

// // // // router.post("/register", register);
// // // // router.post("/login", login);

// // // // module.exports = router;