const ErrorHandler = require("../util/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const Hotel = require("../model/hotelModel");
const Room = require("../model/roomModel");

//create room

exports.createRoom = catchAsyncError(async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  const savedRoom = await newRoom.save();
  try {
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });
  } catch (err) {
    next(err);
  }
  res.status(200).json(savedRoom);
});

//update room
exports.updateRoom = catchAsyncError(async (req, res, next) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedRoom);
});

// update room

exports.updateRoomAvailability = catchAsyncError(async (req, res, next) => {
  await Room.updateOne(
    { "roomNumbers._id": req.params.id },
    {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates,
      },
    }
  );
  res.status(200).json("Room status has been updated.");
});

//delete room

exports.deleteRoom = catchAsyncError(async (req, res, next) => {
  const hotelId = req.params.hotelid;
  await Room.findByIdAndDelete(req.params.id);
  catchAsyncError(
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { rooms: req.params.id },
    })
  );
  res.status(200).json("Room has been deleted.");
});

// single room
exports.getRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json(room);
});

//multiple room
exports.getRooms = catchAsyncError(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
});
