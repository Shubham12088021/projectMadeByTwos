const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  saveStripeOrder   // 🔥 NEW
} = require("../controllers/orderController");

// Normal Order Routes
router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);

// 🔥 Stripe Payment Save Route
router.post("/save-stripe-order", protect, saveStripeOrder);

module.exports = router;
