const mongoose = require("mongoose");

// Schema for user's banking/transaction details
const detailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to a specific user
  fullName: { type: String, required: true }, // account holder name
  bankName: { type: String, required: true }, // bank name
  accountNumber: { type: String, required: true }, // store securely, consider encryption
  accountType: { type: String, enum: ["checking", "savings"], default: "checking" },
  swiftocde: { type: String }, // optional, depending on banking system
  cardNumber: { type: String }, // optional, store only if necessary
  expirationDate: { type: String }, // optional, for cards
  createdAt: { type: Date, default: Date.now }
});

// Optional: mask sensitive fields when returning JSON
detailsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.accountNumber) {
    obj.accountNumber = obj.accountNumber.slice(-4).padStart(obj.accountNumber.length, "*");
  }
  if (obj.cardNumber) {
    obj.cardNumber = obj.cardNumber.slice(-4).padStart(obj.cardNumber.length, "*");
  }
  return obj;
};

module.exports = mongoose.model("Details", detailsSchema);
