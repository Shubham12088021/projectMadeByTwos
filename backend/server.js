const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS (for Vite frontend)

app.use(cors({
  origin: [
    "https://your-frontend.onrender.com",
    "https://your-admin.onrender.com"
  ],
  credentials: true
}));


// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// 🔥 Stripe Payment Route
app.use("/api/payment", require("./routes/payment"));

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
