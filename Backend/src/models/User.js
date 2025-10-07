//backend // src/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Used for password hashing

// Sub-schema for defining specific roles (like admin/editor)
const roleSchema = new mongoose.Schema(
  {
    // The role field must match the expected roles in your authMiddleware's ROLES object
    role: { type: String, enum: ["admin", "user"], required: true } 
  },
  { _id: false } // We don't need Mongoose to generate an ID for each role object
);

// Main user schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  idNumber: { type: String, sparse: true, unique: true }, 
  accountNumber: { type: String, sparse: true },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true }
});


// Password hashing before saving
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

// Compare raw password with hashed one (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema,"users");