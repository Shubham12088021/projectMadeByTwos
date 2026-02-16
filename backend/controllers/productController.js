const Product = require("../models/Product");

/* =========================
   GET ALL PRODUCTS
   (optionally by category)
========================= */
/* =========================
   GET PRODUCTS
   (category + pagination + sorting)
========================= */
exports.getProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    const pageNumber = Number(page);
    const pageSize = Number(limit);

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 }) // latest first
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.json({
      products,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   GET PRODUCT BY ID
========================= */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   CREATE PRODUCT
========================= */
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,

      // 🔥 DYNAMIC DISCOUNT
      discount: req.body.discount || 0,

      rating: req.body.rating || 4,
      numReviews: req.body.numReviews || 0,
    });

    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE PRODUCT
========================= */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name ?? product.name;
    product.image = req.body.image ?? product.image;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.description = req.body.description ?? product.description;

    // 🔥 IMPORTANT: UPDATE DISCOUNT
    product.discount = req.body.discount ?? product.discount;

    product.rating = req.body.rating ?? product.rating;
    product.numReviews = req.body.numReviews ?? product.numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   DELETE PRODUCT
========================= */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
