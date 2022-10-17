const express = require("express");
const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} = require("../controllers/hotelController.js");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticator");
const router = express.Router();

//CREATE
router.post("/", isAuthenticatedUser, authorizeRoles("admin"), createHotel);

//UPDATE
router.put("/:id", isAuthenticatedUser, authorizeRoles("admin"), updateHotel);
//DELETE
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteHotel
);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router;
