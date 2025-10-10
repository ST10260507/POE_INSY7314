// src/middleware/authMiddleware.js
 
const jwt = require("jsonwebtoken");
 
const ROLES = {
    ADMIN: "admin",
    CLIENT: "client",
};
 
// Middleware: Verify JWT and attach user data (Protect)
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });
 
    const token = authHeader.split(" ")[1];

    try {
        // Use the structure that your generateToken function is using (id, email, roles)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "Token invalid or expired" });
    }
};
 
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        // You need to check if the user's role array includes the required role.
        // Assuming req.user.roles is an array of objects like [{ role: "admin" }]
        const hasRequiredRole = req.user?.roles?.some(
            (r) => r.role === requiredRole
        );
 
        if (hasRequiredRole) {
            return next();
        }
 
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
    };
};
 
// 🛑 NEW CODE STARTS HERE 🛑
// Create dedicated middleware for 'client' and 'admin' roles
const client = requireRole(ROLES.CLIENT);
const admin = requireRole(ROLES.ADMIN);
// 🛑 NEW CODE ENDS HERE 🛑

// Export the newly created functions
module.exports = { protect, requireRole, ROLES, client, admin };