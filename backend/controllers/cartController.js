const Cart = require("../models/Cart");

/* =========================
   GET CURRENT USER CART
========================= */
exports.getMyCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate(["items.product", "removedItems.product"]);

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        removedItems: [],
      });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   ADD TO CART (FINAL FIXED VERSION)
========================= */
exports.addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const size = Number(req.body.size); // 🔥 Force number

    if (!size) {
      return res.status(400).json({ message: "Size is required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        removedItems: [],
      });
    }

    // 🔥 Compare product + size
    const itemIndex = cart.items.findIndex(
      (i) =>
        i.product.toString() === productId &&
        i.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty || 1;
    } else {
      cart.items.push({
        product: productId,
        qty: qty || 1,
        size: size,
      });
    }

    await cart.save();
    cart = await cart.populate(["items.product", "removedItems.product"]);

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   REMOVE FROM CART (SIZE SAFE)
========================= */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId, removeAll } = req.body;
    const size = Number(req.body.size);

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex((i) => {
      if (i.product.toString() !== productId) return false;

      // 🔥 If size exists → match size
      if (i.size !== undefined) {
        return i.size === size;
      }

      // 🔥 Old items without size
      return true;
    });

    if (index === -1) {
      cart = await cart.populate(["items.product", "removedItems.product"]);
      return res.json(cart);
    }

    const item = cart.items[index];

    cart.removedItems.push({
      product: item.product,
      qty: removeAll ? item.qty : 1,
      size: item.size,
    });

    if (removeAll || item.qty === 1) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].qty -= 1;
    }

    await cart.save();
    cart = await cart.populate(["items.product", "removedItems.product"]);

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* =========================
   RESTORE FROM RECYCLE BIN
========================= */
exports.restoreFromRecycleBin = async (req, res) => {
  try {
    const { productId } = req.body;
    const size = Number(req.body.size);

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    const index = cart.removedItems.findIndex(
      (i) =>
        i.product.toString() === productId &&
        i.size === size
    );

    if (index === -1) {
      cart = await cart.populate(["items.product", "removedItems.product"]);
      return res.json(cart);
    }

    const removedItem = cart.removedItems[index];

    const activeIndex = cart.items.findIndex(
      (i) =>
        i.product.toString() === productId &&
        i.size === size
    );

    if (activeIndex > -1) {
      cart.items[activeIndex].qty += removedItem.qty;
    } else {
      cart.items.push({
        product: removedItem.product,
        qty: removedItem.qty,
        size: removedItem.size,
      });
    }

    cart.removedItems.splice(index, 1);

    await cart.save();
    cart = await cart.populate(["items.product", "removedItems.product"]);

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};