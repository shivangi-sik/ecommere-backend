
const mongoose = require("mongoose")

const JewellerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    ennum: ["Rings", "Earrings", "Neckpieces", "Bracelets"],
    required: true
  },
  mrp:{
    type: Number,
    required: true
  },
  discount: {
    type: Number
  },
  rating: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  dispatchTime: {
    type: String,
    required: true
  },
  deliveryTime: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})


const Jewellery = mongoose.model("Jewellery", JewellerySchema)
module.exports = Jewellery