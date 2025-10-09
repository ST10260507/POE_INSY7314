//src/models/TransactionDetails.js
const mongoose = require("mongoose");

const swiftCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  bankName: { type: String, required: true },
  country: { type: String, required: true },
});

const detailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String, enum: ["checking", "savings"], default: "checking" },
  swiftCode: { type: String },
  cardNumber: { type: String },
  expirationDate: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

detailsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.accountNumber) obj.accountNumber = obj.accountNumber.slice(-4).padStart(obj.accountNumber.length, "*");
  if (obj.cardNumber) obj.cardNumber = obj.cardNumber.slice(-4).padStart(obj.cardNumber.length, "*");
  return obj;
};

const Details = mongoose.model("TransactionDetails", detailsSchema);
const SwiftCode = mongoose.model("SwiftCode", swiftCodeSchema);

module.exports = { Details, SwiftCode };


// const mongoose = require("mongoose");

// const swiftCodeSchema = new mongoose.Schema({
//   code: { type: String, required: true, unique: true }, 
//   bankName: { type: String, required: true }, 
//   country: { type: String, required: true }, 
// });


// const detailsSchema = new mongoose.Schema({
//   //needs to come from the auth
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
//   fullName: { type: String, required: true }, 
//   //user needs to add recipient details
//   bankName: { type: String, required: true },
//   accountNumber: { type: String, required: true }, 
//   accountType: { type: String, enum: ["checking", "savings"], default: "checking" },
//   //needs to pull from swiftcode collections
//   swiftCode: { type: String }, 
//   //users card info
//   cardNumber: { type: String }, 
//   expirationDate: { type: String },
//   //timestamp of transaction
//   createdAt: { type: Date, default: Date.now },
//   //user doesnt select status. admin edits transaction later on to either approve or reject
//   status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// });

// // mask sensitive fields when returning JSON
// detailsSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   if (obj.accountNumber) {
//     obj.accountNumber = obj.accountNumber.slice(-4).padStart(obj.accountNumber.length, "*");
//   }
//   if (obj.cardNumber) {
//     obj.cardNumber = obj.cardNumber.slice(-4).padStart(obj.cardNumber.length, "*");
//   }
//   return obj;
// };


// // Export the Models
// const User = mongoose.model("User", userSchema);
// const Details = mongoose.model("TransactionDetails", detailsSchema);
// const SwiftCode = mongoose.model("SwiftCode", swiftCodeSchema);

// module.exports = { User, Details, SwiftCode };
