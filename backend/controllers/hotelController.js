const ErrorHandler = require("../util/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const Hotel = require("../model/hotelModel");
const Room = require("../model/roomModel");
const sendToken = require("../util/jwtToken.js");

//create Hotel

exports.createHotel = catchAsyncError(async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  const savedHotel = await newHotel.save();
  res.status(200).json(savedHotel);
});

//update Hotel
exports.updateHotel = catchAsyncError(async (req, res, next) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedHotel);
});

//delete hotel

exports.deleteHotel = catchAsyncError(async (req, res, next) => {
  await Hotel.findByIdAndDelete(req.params.id);
  res.status(200).json("Hotel has been deleted.");
});

//get Hotel

exports.getHotel = catchAsyncError(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  res.status(200).json(hotel);
});

// get hotels
exports.getHotels = catchAsyncError(async (req, res, next) => {
  const { min, max, city, type, ...others } = req.query;
  if (city) {
    const hotels = await Hotel.find({
      ...others,
      city,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } else {
    if (type) {
      const hotels = await Hotel.find({
        ...others,
        type,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } else {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    }
  }
});

//by city

exports.countByCity = catchAsyncError(async (req, res, next) => {
  const cities = req.query.cities.split(",");
  const list = await Promise.all(
    cities.map((city) => {
      return Hotel.countDocuments({ city });
    })
  );
  res.status(200).json(list);
});

// by type

exports.countByType = catchAsyncError(async (req, res, next) => {
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  res.status(200).json([
    { type: "hotel", count: hotelCount },
    { type: "apartments", count: apartmentCount },
    { type: "resorts", count: resortCount },
    { type: "villas", count: villaCount },
    { type: "cabins", count: cabinCount },
  ]);
});

//rooms

exports.getHotelRooms = catchAsyncError(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  const list = await Promise.all(
    hotel.rooms.map((room) => {
      return Room.findById(room);
    })
  );
  res.status(200).json(list);
});
