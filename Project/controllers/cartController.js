const Cart = require("../models/Cart");

// GET current user's cart
exports.getMyCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.json(cart);
};

// ADD item to cart
exports.addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (i) => i.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += qty || 1;
  } else {
    cart.items.push({ product: productId, qty: qty || 1 });
  }

  await cart.save();
  res.json(cart);
};

// REMOVE item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (i) => i.product.toString() !== productId
  );

  await cart.save();
  res.json(cart);
};
