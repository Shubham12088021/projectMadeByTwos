const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const {
  placeOrder,
  getMyOrders,
  getAllOrders
} = require("../controllers/orderController");

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);

module.exports = router;
