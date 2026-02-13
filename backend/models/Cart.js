const mongoose = require("mongoose");

/* =========================
   ACTIVE CART ITEM
========================= */
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  qty: {
    type: Number,
    required: true,
    default: 1
  },
  size: {               // 🔥 ADD THIS
    type: Number,
    required: true
  }
});

/* =========================
   RECYCLE BIN ITEM
========================= */
const removedItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  size: {               // 🔥 ADD THIS
    type: Number,
    required: true
  },
  removedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: [cartItemSchema],
    removedItems: [removedItemSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
