const express = require("express");
const { newOrder, getOrder } = require("../controllers/orderController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticator");
const router = express.Router();

router.post("/", isAuthenticatedUser, newOrder);
router.get("/", isAuthenticatedUser, getOrder);

module.exports = router;
