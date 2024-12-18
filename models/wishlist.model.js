const mongoose = require("mongoose")

const wishlistSchema = new mongoose.Schema({
    _id: {
type: String,
required: true
    },
name: {
    type: String,
    required: true
},
mrp: {
    type: Number,
    required: true
},
discount: Number,
imageUrl: {
    type: String,
    required: true
}
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema)

module.exports = Wishlist
