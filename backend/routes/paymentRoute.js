const express = require("express");
const { isAuthenticatedUser } = require("../middleware/authenticator");
const { processPayment } = require("../controllers/paymentController");
const router = express.Router();

router.post("/", isAuthenticatedUser, processPayment);

module.exports = router;
