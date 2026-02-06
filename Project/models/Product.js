const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    price: Number,
    category: String,
    description: String,

    // ⭐ NEW
    rating: {
      type: Number,
      default: 4,
    },
    numReviews: {
      type: Number,
      default: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
