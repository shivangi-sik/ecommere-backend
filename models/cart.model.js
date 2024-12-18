const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  discount: Number,
  quantity: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart
