// authMiddleware.js

const jwt = require("jsonwebtoken");

// Define ROLES object for type safety and easy reference
const ROLES = {
  ADMIN: 'admin',
  EMPLOYER: 'employer', 
  USER: 'user',
};

// Middleware to check if the user has one of the required roles
const requireRole = (requiredRole) => {
  return (req, res, next) => {
    // This assumes req.user has been populated by the 'protect' middleware 
    // and contains a 'role' property (which your JWT payload must include).
    const userRole = req.user?.role; 
    
    if (userRole === requiredRole) {
      return next();
    }
    
    // Forbidden if role doesn't match
    res.status(403).json({ message: "Forbidden: Insufficient role" });
  };
};

/**
 * @desc Middleware to verify JWT and attach user info (decoded payload) to req.user.
 */
const protect = (req, res, next) => {
  let token;

  // Check for the "Bearer <token>" format in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (removes "Bearer ")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded token payload (which MUST include 'role' for requireRole to work)
      req.user = decoded;

      // Continue to the next middleware or controller
      return next(); // Use return here to ensure only one response/call to next()
    } catch (error) {
      console.error(error);
      // Token is invalid or expired
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    // No token provided in the header
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Export all three items correctly for the router to use destructuring
module.exports = { protect, requireRole, ROLES };