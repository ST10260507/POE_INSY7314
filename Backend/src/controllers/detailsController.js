const Details = require("../models/Details");

// Save banking details
exports.addDetails = async (req, res) => {
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

    const details = new Details({
      userId: req.user.id, // comes from protect middleware
      fullName,
      bankName,
      accountNumber,
      accountType,
      swiftcode,
      cardNumber,
      expirationDate,
    });

    await details.save();
    res.status(201).json({ message: "Details saved successfully", details });
  } catch (err) {
    console.error("Error saving details:", err);
    res.status(500).json({ message: "Server error" });
  }
};
