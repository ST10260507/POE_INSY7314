// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// // Sub-schema for blog roles
// const roleSchema = new mongoose.Schema(
//   {
//     blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
//     role: { type: String, enum: ["admin", "editor", "reader"], required: true }
//   },
//   { _id: false }
// );

// // Main user schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true, required: true, lowercase: true, trim: true },
//   password: { type: String, required: true },
//   roles: [roleSchema]
// });

// // 🔑 Password hashing before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // Only hash if password is new/changed
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // 🔑 Compare raw password with hashed one
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);


// // const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");

// // // each user can have multiple roles, tied to blogs if needed
// // const roleSchema = new mongoose.Schema({
// //   blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" }, // link role to a specific blog
// //   role: { type: String, enum: ["admin", "editor", "reader"], required: true } // roles allowed
// // }, { _id: false });

// // const userSchema = new mongoose.Schema({
// //   email: { type: String, unique: true, required: true }, // user email must be unique
// //   password: { type: String, required: true }, // hashed password
// //   roles: [roleSchema] // array of roles
// // });

// // // helper to compare stored password with login password
// // userSchema.methods.comparePassword = async function (candidate) {
// //   return await bcrypt.compare(candidate, this.password);
// // };

// // module.exports = mongoose.model("User", userSchema);

// // import mongoose from "mongoose";
// // import bcrypt from "bcryptjs";

// // const userSchema = new mongoose.Schema(
// //   {
// //     email: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       lowercase: true,
// //       trim: true,
// //     },
// //     password: {
// //       type: String,
// //       required: true,
// //       minlength: 6,
// //     },
// //     role: {
// //       type: String,
// //       enum: ["admin", "editor", "author", "reader"], // restrict values
// //       default: "reader",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // // ✅ Hash password before save
// // userSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // ✅ Compare password method for login
// // userSchema.methods.comparePassword = async function (candidatePassword) {
// //   return await bcrypt.compare(candidatePassword, this.password);
// // };

// // const User = mongoose.model("User", userSchema);

// // export default User;


// // const mongoose = require("mongoose");
// // const bcrypt = require("bcrypt");

// // // Schema defines how user documents will look
// // const userSchema = new mongoose.Schema({
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true
// //   },
// //   password: {
// //     type: String,
// //     required: true
// //   }
// // });

// // // Automatically hash password before saving
// // userSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // Compare plain text password with hashed password
// // userSchema.methods.comparePassword = function (candidatePassword) {
// //   return bcrypt.compare(candidatePassword, this.password);
// // };

// // module.exports = mongoose.model("User", userSchema);