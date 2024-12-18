const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    houseNo: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    pinCode: Number,
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
