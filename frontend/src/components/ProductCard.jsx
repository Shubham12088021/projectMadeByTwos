import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const discountPercent = 20;
  const oldPrice = product.price;
  const newPrice = Math.round(oldPrice * (1 - discountPercent / 100));

  return (
    <Link to={`/product/${product._id}`} className="product-link">
      <div className="product-card">

        {/* IMAGE */}
        <div className="img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
            loading="lazy"
          />

          {/* 🔥 HOVER OVERLAY */}
          <div className="view-overlay">
            <span>View Details</span>
          </div>
        </div>

        {/* INFO */}
        <div className="product-info">
          <h5 className="product-name">{product.name}</h5>

          <div className="rating">
            ★★★★☆
            <span className="rating-text">
              ({product.numReviews || 0})
            </span>
          </div>

          <div className="price-box">
            <div className="price-row">
              <span className="old-price">₹{oldPrice}</span>
              <span className="new-price">₹{newPrice}</span>
            </div>

            <div className="discount-box">
              {discountPercent}% OFF
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;
