const User = require("../models/User");

exports.addTransaction = async (req, res) => {
  try {
    const {
      fullName,
      bankName,
      accountNumber,
      accountType,
      swiftcode,
      cardNumber,
      expirationDate,
    } = req.body;

    // find the logged-in user (assuming you have user ID in req.user.id)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // create a transaction object
    const transaction = {
      fullName,
      bankName,
      accountNumber,
      accountType,
      swiftcode,
      cardNumber,
      expirationDate,
    };

    // push to user's transactions array
    user.transactions.push(transaction);
    await user.save();

    res.status(201).json({
      message: "Transaction saved successfully",
      transaction,
    });
  } catch (err) {
    console.error("Error saving transaction:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
