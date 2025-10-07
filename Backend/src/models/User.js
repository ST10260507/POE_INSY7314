//backend // src/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for roles, used for complex authorization
const roleSchema = new mongoose.Schema({
  // Only the role string is needed for now, simplifies the schema
  role: { type: String, enum: ["admin", "client"], required: true, default: "client" } 
}, { _id: false });

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  
  // Stored as the bcrypt hash
  password: { type: String, required: true }, 

  // ID Number - Must be unique for login lookup
  idNumber: { type: String, required: true, unique: true, index: true }, 

  // Account Number - Required and unique for banking system context
  accountNumber: { type: String, required: true, unique: true, index: true },

  // Use the array structure for future flexibility, default to 'client'
  roles: { type: [roleSchema], default: [{ role: "client" }] } 
}, { timestamps: true });

// CRITICAL SECURITY FIX: HASH PASSWORD BEFORE SAVING
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass error to Mongoose
  }
});

// Helper method to compare stored password with login password
userSchema.methods.comparePassword = async function (candidatePassword) {
  // Use bcrypt to compare the plain text input with the stored hash
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs"); // Used for password hashing

// // Sub-schema for defining specific roles (like admin/editor)
// const roleSchema = new mongoose.Schema(
//   {
//     // The role field must match the expected roles in your authMiddleware's ROLES object
//     role: { type: String, enum: ["admin", "user"], required: true } 
//   },
//   { _id: false } // We don't need Mongoose to generate an ID for each role object
// );

// // Main user schema
// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["admin", "user"], default: "user" },
//   idNumber: { type: String, sparse: true, unique: true }, 
//   accountNumber: { type: String, sparse: true },
//   lastLogin: { type: Date },
//   isActive: { type: Boolean, default: true }
// });


// // Password hashing before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Compare raw password with hashed one (for login)
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema,"users");