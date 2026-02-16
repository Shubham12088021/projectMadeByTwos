const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: Number,
        price: Number,
        size: Number    // 🔥 ADD THIS
      }
    ],

    totalPrice: {
      type: Number,
      required: true
    },

    isPaid: {
      type: Boolean,
      default: false
    },

    // 🔥 STRIPE FIELDS ADDED
    paidAt: {
      type: Date
    },

    paymentMethod: {
      type: String,
      default: "Stripe"
    },

    stripeSessionId: {
      type: String
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
