const cookieParser = require("cookie-parser");
const express = require("express");
var cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/error");

//Route Import
const user = require("./routes/userRoute.js");
const hotel = require("./routes/hotelRoute.js");
const room = require("./routes/roomRoute.js");
const payment = require("./routes/paymentRoute");
const order = require("./routes/orderRoute");

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/v1", user);
app.use("/api/v1/hotel", hotel);
app.use("/api/v1/room", room);
app.use("/api/v1/payment", payment);
app.use("/api/v1/order", order);

app.use(errorMiddleware);

module.exports = app;
