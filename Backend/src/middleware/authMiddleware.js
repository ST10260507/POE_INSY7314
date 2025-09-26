const User = require("../models/User");

// middleware to restrict routes by role
const requireRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(401).json({ message: "user not found" });

      // check if admin
      if (role === "admin") {
        const isAdmin = user.roles.some(r => r.role === "admin");
        if (!isAdmin) return res.status(403).json({ message: "forbidden" });
        return next();
      }

      // check for editor or reader in context of blog
      const blogId = req.params.blogId || req.body.blogId;
      const hasRole = user.roles.some(r =>
        r.role === role && (!blogId || r.blogId?.toString() === blogId)
      );

      // admins override everything
      if (!hasRole && !user.roles.some(r => r.role === "admin")) {
        return res.status(403).json({ message: "forbidden" });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: "server error" });
    }
  };
};

module.exports = { requireRole };

// import jwt from "jsonwebtoken";

// // 🔑 Verify JWT and attach user info
// export const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { sub: userId, role: 'reader' | 'author' | ... }
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Token invalid or expired" });
//   }
// };

// // 👑 Require a specific role
// export const requireRole = (roles) => {
//   // roles can be a string or an array of roles
//   return (req, res, next) => {
//     const userRole = req.user?.role;
//     if (!userRole || ![].concat(roles).includes(userRole)) {
//       return res.status(403).json({ message: "Forbidden: Insufficient role" });
//     }
//     next();
//   };
// };

// // ✍️ Require self (user owns the resource) OR a specific role
// export const requireSelfOrRole = (param = "id", roles = []) => {
//   // param = name of the route param containing the user ID
//   return (req, res, next) => {
//     const userId = req.user?.sub;
//     const userRole = req.user?.role;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // ✅ allow if user owns the resource
//     if (req.params[param] && req.params[param] === userId.toString()) {
//       return next();
//     }

//     // ✅ allow if user has one of the roles
//     if ([].concat(roles).includes(userRole)) {
//       return next();
//     }

//     return res.status(403).json({ message: "Forbidden: Not owner or role" });
//   };
// };


// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to request
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Token invalid or expired" });
//   }
// };

// module.exports = { protect };