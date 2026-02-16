const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

// 🔥 Save Stripe Order After Payment (Supports Buy Now + Cart)
exports.saveStripeOrder = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID missing" });
    }

    // 🔍 Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // 🔒 Prevent duplicate orders
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
    if (existingOrder) {
      return res.status(200).json(existingOrder);
    }

    let items = [];
    let totalPrice = 0;

    // 🔥 1️⃣ FIRST: Check if metadata exists (Buy Now case)
    if (session.metadata && session.metadata.customItems) {

      const itemsFromStripe = JSON.parse(session.metadata.customItems);

      items = itemsFromStripe.map(item => ({
        product: null, // optional: can link later
        qty: item.quantity,
        price: item.price
      }));

      totalPrice = items.reduce(
        (sum, i) => sum + i.qty * i.price,
        0
      );

    } else {

      // 🔥 2️⃣ FALLBACK: Use cart (Cart Checkout case)
      const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

      if (cart && cart.items.length > 0) {

        items = cart.items.map(i => ({
          product: i.product._id,
          qty: i.qty,
          price: i.product.price
        }));

        totalPrice = items.reduce(
          (sum, i) => sum + i.qty * i.price,
          0
        );

        // 🧹 Clear cart only for cart checkout
        cart.items = [];
        await cart.save();
      }
    }

    // ✅ Create Order
    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentMethod: "Stripe",
      stripeSessionId: sessionId
    });

    res.status(201).json(order);

  } catch (error) {
    console.error("Stripe Save Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
