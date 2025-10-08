// src/middleware/authMiddleware.js
 
const jwt = require("jsonwebtoken");
 
// 💡 STEP 1: Define the ROLES constant

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
 
// 💡 STEP 2: Define the requireRole function

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
 
// 💡 STEP 3: Export all three components

module.exports = { protect, requireRole, ROLES };
 

// const jwt = require("jsonwebtoken");
 
// const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer "))
//     return res.status(401).json({ message: "Unauthorized" });
 
//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Token invalid or expired" });
//   }
// };
 
// module.exports = { protect };
 

// // middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");

// //roles
// const ROLES = {
//   ADMIN: "admin",
//   CLIENT: "client",
// };

// //verify jwt
// const protect = (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET || "your_jwt_secret"
//       );

//       req.user = decoded; // { id, role }
//       return next();
//     } catch (err) {
//       console.error("JWT Error:", err);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };


// const requireRole = (requiredRole) => {
//   return (req, res, next) => {
//     if (req.user?.role === requiredRole) {
//       return next();
//     }
//     return res.status(403).json({ message: "Forbidden: Insufficient role" });
//   };
// };

// module.exports = { protect, requireRole, ROLES };
