import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-link">
      <div className="product-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />

        <div className="product-info">
          {/* 👟 Shoe Name */}
          <h5 className="product-name">{product.name}</h5>

          {/* ⭐ Star Rating */}
          <div className="rating">
            ★★★★☆ <span className="rating-text">4.0</span>
          </div>

          {/* 💰 Price */}
          <p className="price">₹{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
