const Order = require("../model/orderModel");
const ErrorHandler = require("../util/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const { hotel, dates, days, rooms, amtPaid, user } = req.body;
  const order = await Order.create({
    hotel,
    dates,
    days,
    user,
    rooms,
    amtPaid,
  });

  if (!order) {
    return next(new ErrorHandler("Order Unsuccessful", 424));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find(req.body);
  console.log(orders);
  if (!orders) {
    return next(new ErrorHandler("No Orders Found", 404));
  }
  const { _id, items, quantity, price, status, address } = orders;
  res.status(200).json({
    success: true,
    orders,
  });
});
