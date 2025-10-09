//src/middleware/roles.js
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