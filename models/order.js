const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  order_name: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
    // required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
