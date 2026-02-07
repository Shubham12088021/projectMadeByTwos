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
   ADD TO CART
========================= */
exports.addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        removedItems: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty || 1;
    } else {
      cart.items.push({
        product: productId,
        qty: qty || 1,
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
   REMOVE FROM CART (RECYCLE BIN)
   - default: qty--
   - removeAll: true -> move full item to recycle bin
========================= */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId, removeAll } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (index === -1) {
      cart = await cart.populate(["items.product", "removedItems.product"]);
      return res.json(cart);
    }

    const item = cart.items[index];

    // ♻️ MOVE TO RECYCLE BIN
    cart.removedItems.push({
      product: item.product,
      qty: removeAll ? item.qty : 1,
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
   RESTORE FROM RECYCLE BIN (UNDO)
========================= */
exports.restoreFromRecycleBin = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    const index = cart.removedItems.findIndex(
      (i) => i.product.toString() === productId
    );

    if (index === -1) {
      cart = await cart.populate(["items.product", "removedItems.product"]);
      return res.json(cart);
    }

    const removedItem = cart.removedItems[index];

    const activeIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (activeIndex > -1) {
      cart.items[activeIndex].qty += removedItem.qty;
    } else {
      cart.items.push({
        product: removedItem.product,
        qty: removedItem.qty,
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
