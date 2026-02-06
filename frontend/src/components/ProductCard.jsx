import "./ProductCard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product }) => {

  const addToCartHandler = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT saved at login

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          qty: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Added to cart ✅");
    } catch (error) {
      console.log(error);
      alert("Please login to add items to cart");
    }
  };

  return (
    <div className="product-card">

      {/* Clickable product info */}
      <Link to={`/product/${product._id}`} className="product-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />

        <div className="product-info">
          <h5 className="product-name">{product.name}</h5>

          <div className="rating">
            ★★★★☆ <span className="rating-text">4.0</span>
          </div>

          <p className="price">₹{product.price}</p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button className="add-to-cart-btn" onClick={addToCartHandler}>
        Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;
