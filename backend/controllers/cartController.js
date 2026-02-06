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

// ADD item to cart (increase qty if exists)
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

// REMOVE 1 qty OR remove item if qty = 1
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const itemIndex = cart.items.findIndex(
    (i) => i.product.toString() === productId
  );

  if (itemIndex > -1) {
    if (cart.items[itemIndex].qty > 1) {
      cart.items[itemIndex].qty -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  }

  await cart.save();
  res.json(cart);
};
