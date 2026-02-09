import "./newArrivals.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../context/CartContext";

function NewArrivals() {
  const [activeTab, setActiveTab] = useState("men");
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const navigate = useNavigate();
  const { setCartCount } = useCart();
  const token = localStorage.getItem("token");

  // 🔁 fetch products
  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=${activeTab}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [activeTab]);

  // 🛒 ADD TO CART
  const addToCart = async (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoadingId(productId);
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, qty: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ update navbar badge (unique items)
      setCartCount(data.items.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleViewAll = () => {
    navigate(`/${activeTab}`);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center fw-semibold mb-4">New Arrivals</h2>

      {/* TABS */}
      <div className="d-flex justify-content-center gap-4 mb-4 arrivals-tabs">
        <span
          className={activeTab === "men" ? "active" : ""}
          onClick={() => setActiveTab("men")}
        >
          Men's Collection
        </span>
        <span
          className={activeTab === "women" ? "active" : ""}
          onClick={() => setActiveTab("women")}
        >
          Women's Collection
        </span>
      </div>

      {/* PRODUCTS */}
      <div className="row g-4">
        {products.slice(0, 5).map(item => (
          <div className="col-md-4" key={item._id}>
            <div className="product-card">
              <span className="badge-new">NEW ARRIVAL</span>

              <img src={item.image} alt={item.name} />

              <h6 className="product-name">{item.name}</h6>

              {/* ⭐ RATING */}
              <div className="rating">
                {"★".repeat(Math.round(item.rating))}
                {"☆".repeat(5 - Math.round(item.rating))}
                <span className="review-count">({item.numReviews})</span>
              </div>

              <p className="price">₹{item.price}</p>

              {/* 🛒 ADD TO CART ICON */}
              <button
                className="add-cart-btn"
                disabled={loadingId === item._id}
                onClick={() => addToCart(item._id)}
              >
                <FaShoppingCart />
                {loadingId === item._id ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL */}
      <div className="text-center mt-4">
        <button className="btn btn-dark px-4" onClick={handleViewAll}>
          VIEW ALL
        </button>
      </div>
    </div>
  );
}

export default NewArrivals;
