// src/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Used for password hashing

// Sub-schema for defining specific roles (like admin/editor)
const roleSchema = new mongoose.Schema(
  {
    // The role field must match the expected roles in your authMiddleware's ROLES object
    role: { type: String, enum: ["admin", "employer", "user"], required: true } 
  },
  { _id: false } // We don't need Mongoose to generate an ID for each role object
);

// Main user schema
const userSchema = new mongoose.Schema({
  // Adding fullName field for convenience, as used in your transactionsController
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  // NOTE: Your transaction router uses a single 'role' property on req.user. 
  // For simplicity, we'll adapt to a single 'role' for now, but 
  // using 'roles: [roleSchema]' is more advanced. 
  // Let's stick to the single 'role' field for compatibility with the middleware logic.
  role: { type: String, enum: ["admin", "employer", "user"], default: "user" },
});


// 🔑 Password hashing before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔑 Compare raw password with hashed one (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);