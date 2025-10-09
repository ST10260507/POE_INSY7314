 //src/models/User.js
 // Import mongoose to define the schema and interact with MongoDB
const mongoose = require("mongoose");
 
// Import bcrypt to hash and compare passwords securely
const bcrypt = require("bcrypt");
 
const roleSchema = new mongoose.Schema({
  transactionId: {type: mongoose.Schema.Types.ObjectId,ref: "Transaction"},
  role: {type: String, enum: ["admin", "client"], required: true}
}, {_id: false});
 
// Define the schema for User documents in MongoDB
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  
  // Stored as the bcrypt hash
  password: { type: String, required: true }, 

  // ID Number - Must be unique for login lookup
  idNumber: { type: String, required: true, unique: true, index: true }, 

  // Account Number - Required and unique for banking system context
  accountNumber: { type: String, required: true, unique: true, index: true },

  roles: [roleSchema]
});
 
// runs before a user is saved to the databasr
userSchema.pre("save", async function (next) {
  // If the password wasn't changed, skip hashing
  if (!this.isModified("password")) return next();
 
  // generate a salt with 10 rounds - more rounds = more secure but slower
  // what's a salt?
  const salt = await bcrypt.genSalt(10);
 
  // Hash the password with the salt and store the hashed value
  this.password = await bcrypt.hash(this.password, salt);
 
  // Continue with the save operation
  next();
});
 
// compares a plain password with the hashed password in DB
userSchema.methods.comparePassword = async function (candidate) {
  // Returns true or false based on whether passwords match
  return await bcrypt.compare(candidate, this.password);
};
 
// Export the model so it can be used elsewhere in the app
// This creates a 'users' collection in MongoDB
module.exports = mongoose.model("User", userSchema);