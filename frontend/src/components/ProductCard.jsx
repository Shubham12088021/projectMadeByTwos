import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) return null;

  // 🔥 PRICE LOGIC
  const discountPercent = 20;
  const oldPrice = product.price;
  const newPrice = Math.round(oldPrice * (1 - discountPercent / 100));

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        
        {/* IMAGE */}
        <div className="img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
            loading="lazy"
          />
        </div>

        {/* INFO */}
        <div className="product-info">
          <h5 className="product-name">{product.name}</h5>

          {/* RATING */}
          <div className="rating">
            ★★★★☆ <span className="rating-text">4.0</span>
          </div>

          {/* PRICE */}
          <div className="price-box">
            <div className="price-row">
              {/* LEFT = CUTTED PRICE */}
              <span className="old-price">₹{oldPrice}</span>

              {/* RIGHT = FINAL PRICE */}
              <span className="price">₹{newPrice}</span>
            </div>

            <div className="discount-box">
              {discountPercent}% OFF
            </div>
          </div>
        </div>

      </Link>
    </div>
  );
};

export default ProductCard;
