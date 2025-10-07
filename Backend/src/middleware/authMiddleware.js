// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

//roles
const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

//verify jwt
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_jwt_secret"
      );

      req.user = decoded; // { id, role }
      return next();
    } catch (err) {
      console.error("JWT Error:", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};


const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user?.role === requiredRole) {
      return next();
    }
    return res.status(403).json({ message: "Forbidden: Insufficient role" });
  };
};

module.exports = { protect, requireRole, ROLES };
