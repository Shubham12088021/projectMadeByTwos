const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getMyCart,
  addToCart,
  removeFromCart,
  restoreFromRecycleBin
} = require("../controllers/cartController");

// GET CART
router.get("/", protect, getMyCart);

// ADD ITEM
router.post("/add", protect, addToCart);

// REMOVE (moves to recycle bin)
router.post("/remove", protect, removeFromCart);

// RESTORE FROM RECYCLE BIN (UNDO)
router.post("/restore", protect, restoreFromRecycleBin);

module.exports = router;
