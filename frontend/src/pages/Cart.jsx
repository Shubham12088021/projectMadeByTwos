import { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(null);
  const [cartCount, setCartCount] = useState(
    Number(localStorage.getItem("cartCount")) || 0
  );

  const token = localStorage.getItem("token");

  /* FETCH CART */
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
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  /* SYNC CART COUNT */
  useEffect(() => {
    if (cart && cart.items) {
      const totalQty = cart.items.reduce(
        (acc, item) => acc + item.qty,
        0
      );
      localStorage.setItem("cartCount", totalQty);
      setCartCount(totalQty);
    }
  }, [cart]);

  const increaseQty = async (id) => {
    try {
      setBtnLoading(id + "+");
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: id, qty: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(data);
    } finally {
      setBtnLoading(null);
    }
  };

  const decreaseQty = async (id) => {
    try {
      setBtnLoading(id + "-");
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(data);
    } finally {
      setBtnLoading(null);
    }
  };

  const removeItem = async (id) => {
    try {
      setBtnLoading(id + "x");
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/remove",
        { productId: id, removeAll: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(data);
    } finally {
      setBtnLoading(null);
    }
  };

  if (loading) {
    return <h2>Loading cart…</h2>;
  }

  if (!cart || cart.items.length === 0)
    return <h2 className="empty-cart">🛒 Your cart is empty</h2>;

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  return (
    <div className="cart-wrapper">
      <div className="cart-glass">

        {/* 🛒 CART BUTTON WITH COUNT */}
        <button className="cart-btn">
          🛒 Cart
          <span className="cart-count">{cartCount}</span>
        </button>

        {cart.items.map((item) => (
          <div className="cart-card" key={item.product._id}>
            <img src={item.product.image} alt={item.product.name} />

            <div className="cart-info">
              <h3>{item.product.name}</h3>
              <p>₹{item.product.price}</p>

              <div className="qty-box">
                <button onClick={() => decreaseQty(item.product._id)}>
                  −
                </button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.product._id)}>
                  +
                </button>
              </div>
            </div>

            <div className="cart-price">
              ₹{item.product.price * item.qty}
              <button
                className="remove-btn"
                onClick={() => removeItem(item.product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-glass">
        <h3>Subtotal</h3>
        <h1>₹{subtotal}</h1>
      </div>
    </div>
  );
};

export default Cart;
