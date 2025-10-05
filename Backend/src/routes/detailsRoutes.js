const express = require("express");
const router = express.Router();
const { addTransaction } = require("../controllers/detailsController");
const { protect } = require("../middleware/authMiddleware"); // ensures user is logged in

router.post("/details", protect, addTransaction);

module.exports = router;
