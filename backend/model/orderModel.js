const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  hotel: {
    type: String,
    required: true,
  },
  /* dates: [
    {
      type: Date,
    },
  ],*/
  days: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  /*rooms: [
    {
      type: String,
      require: true,
    },
  ],*/
  amtPaid: {
    type: Number,
  },
});

module.exports = mongoose.model("orders", orderSchema);
