// src/middleware/rateLimiter.js
const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

// -----------------------------
// Proxy-aware IP key function
// -----------------------------
const keyByIp = (req) => {
  return ipKeyGenerator(
    req.ip ||
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.connection?.remoteAddress ||
      "unknown"
  );
};

// -----------------------------
// Register limiter
// -----------------------------
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 registration attempts per IP
  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false,
  keyGenerator: keyByIp,
  handler: (req, res) => {
    return res.status(429).json({
      message: "Too many registration attempts. Please try again later."
    });
  }
});

// -----------------------------
// Login limiter (per-IP + email/accountNumber)
// -----------------------------
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // don't punish successful logins
  keyGenerator: (req) => {
    const identifier = (req.body?.email || req.body?.accountNumber || "").toLowerCase().trim();
    return `${keyByIp(req)}:${identifier}`;
  },
  handler: (req, res) => {
    return res.status(429).json({
      message: "Too many login attempts. Please try again later."
    });
  }
});

module.exports = { registerLimiter, loginLimiter };
