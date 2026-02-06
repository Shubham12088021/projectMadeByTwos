const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getMyCart,
  addToCart,
  removeFromCart
} = require("../controllers/cartController");

router.get("/", protect, getMyCart);
router.post("/add",protect, addToCart);
router.post("/remove", protect, removeFromCart);

module.exports = router;
