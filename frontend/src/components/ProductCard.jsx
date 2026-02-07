import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) return null; // safety

  const discountPercent = 20;
  const oldPrice = product.price;
  const newPrice = Math.round(oldPrice * (1 - discountPercent / 100));

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
            loading="lazy"
          />
        </div>

        <div className="product-info">
          <h5 className="product-name">{product.name}</h5>

          <div className="rating">
            ★★★★☆ <span className="rating-text">4.0</span>
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
      </Link>
    </div>
  );
};

export default ProductCard;
