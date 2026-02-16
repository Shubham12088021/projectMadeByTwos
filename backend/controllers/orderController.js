const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =========================
   PLACE ORDER (Manual)
========================= */
exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cart.items.map(i => ({
    product: i.product._id,
    qty: i.qty,
    price: i.product.price,
    size: i.size
  }));

  const totalPrice = items.reduce(
    (sum, i) => sum + i.qty * i.price,
    0
  );

  const order = await Order.create({
    user: req.user._id,
    items,
    totalPrice,
    isPaid: false
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

/* =========================
   USER ORDERS
========================= */
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product");

  res.json(orders);
};

/* =========================
   ADMIN - ALL ORDERS
========================= */
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product");

  res.json(orders);
};

/* =========================
   SAVE STRIPE ORDER (FINAL DEBUG VERSION)
========================= */
exports.saveStripeOrder = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID missing" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("Stripe Metadata RAW:", session.metadata);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Prevent duplicate order
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
    if (existingOrder) {
      return res.status(200).json(existingOrder);
    }

    let items = [];
    let totalPrice = 0;

    if (session.metadata && session.metadata.customItems) {

      const itemsFromStripe = JSON.parse(session.metadata.customItems);

      console.log("Parsed Items From Stripe:", itemsFromStripe);

      items = itemsFromStripe.map(item => ({
        product: item.id,
        qty: Number(item.quantity),
        price: Number(item.price),
        size: item.size ? Number(item.size) : null
      }));

      totalPrice = items.reduce(
        (sum, i) => sum + i.qty * i.price,
        0
      );
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentMethod: "Stripe",
      stripeSessionId: sessionId
    });

    // Always clear cart
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json(order);

  } catch (error) {
    console.error("Stripe Save Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
