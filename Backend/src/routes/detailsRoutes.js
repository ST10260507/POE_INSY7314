const express = require("express");
const router = express.Router();
const { addTransaction } = require("../controllers/transactionDetailsController");
const { protect } = require("../middleware/authMiddleware"); // ensures user is logged in

router.post("/transactiondetails", protect, addTransaction);

module.exports = router;
