import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔥 IMPORTANT
  const { syncCart, increaseCart, decreaseCart } = useCart();

  /* ===== FETCH CART ===== */
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/cart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCart(data);
        syncCart();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  /* ===== INCREASE QTY ===== */
  const increaseQty = async (id) => {
    try {
      setBtnLoading(id + "+");

      // 🔥 OPTIMISTIC BADGE
      increaseCart(1);

      const { data } = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: id, qty: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data);
      syncCart();
    } catch {
      // fallback
      syncCart();
    } finally {
      setBtnLoading(null);
    }
  };

  /* ===== DECREASE QTY ===== */
  const decreaseQty = async (id) => {
    try {
      setBtnLoading(id + "-");

      // 🔥 OPTIMISTIC BADGE
      decreaseCart(1);

      const { data } = await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data);
      syncCart();
    } catch {
      syncCart();
    } finally {
      setBtnLoading(null);
    }
  };

  /* ===== REMOVE ITEM ===== */
  const removeItem = async (id, qty) => {
    try {
      setBtnLoading(id + "x");

      // 🔥 OPTIMISTIC BADGE
      decreaseCart(qty);

      const { data } = await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId: id, removeAll: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data);
      syncCart();
    } catch {
      syncCart();
    } finally {
      setBtnLoading(null);
    }
  };

  /* ===== LOADER ===== */
  if (loading) {
    return (
      <div className="loader-screen">
        <div className="spinner"></div>
        <p>Loading your cart…</p>
      </div>
    );
  }

  /* ===== EMPTY CART ===== */
  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-cart-section">
        <div className="empty-cart-box">
          <h2>🛒 Your cart is empty</h2>
          <p>Looks like you haven’t added anything yet</p>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  return (
    <div className="cart-wrapper">
      <div className="cart-glass">
        <h1 className="cart-title">Your Shopping Cart</h1>

        {cart.items.map((item) => (
          <div className="cart-card" key={item.product._id}>
            <img src={item.product.image} alt={item.product.name} />

            <div className="cart-info">
              <h3>{item.product.name}</h3>
              <p>₹{item.product.price}</p>

              <div className="qty-box">
                <button
                  disabled={btnLoading === item.product._id + "-"}
                  onClick={() => decreaseQty(item.product._id)}
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  disabled={btnLoading === item.product._id + "+"}
                  onClick={() => increaseQty(item.product._id)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-price">
  <span className="item-total">
    ₹{item.product.price * item.qty}
  </span>

  <button
    className="remove-btn icon-btn"
    disabled={btnLoading === item.product._id + "x"}
    onClick={() => removeItem(item.product._id, item.qty)}
    title="Remove item"
  >
    <FaTrashAlt />
  </button>
</div>

          </div>
        ))}
      </div>

      <div className="checkout-glass">
        <h3>Subtotal</h3>
        <h1>₹{subtotal}</h1>
        <button className="buy-btn">🚀 Proceed to Buy</button>
      </div>
    </div>
  );
};

export default Cart;
