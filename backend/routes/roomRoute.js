const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../controllers/roomController.js");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticator");

const router = express.Router();
//CREATE
router.post(
  "/:hotelid",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createRoom
);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", isAuthenticatedUser, authorizeRoles("admin"), updateRoom);
//DELETE
router.delete(
  "/:id/:hotelid",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteRoom
);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

module.exports = router;
