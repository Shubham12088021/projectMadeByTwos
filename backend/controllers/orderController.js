const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cart.items.map(i => ({
    product: i.product._id,
    qty: i.qty,
    price: i.product.price
  }));

  const totalPrice = items.reduce(
    (sum, i) => sum + i.qty * i.price,
    0
  );

  const order = await Order.create({
    user: req.user._id,
    items,
    totalPrice
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

// User orders
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product");
  res.json(orders);
};

// Admin: all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product");
  res.json(orders);
};
