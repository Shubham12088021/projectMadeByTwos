import React from "react";
import { useNavigate } from "react-router-dom";

const CartToast = ({ product, size, closeToast }) => {
  const navigate = useNavigate();

  return (
    <div className="cart-toast">
      {/* Header */}
      <div className="cart-toast-header">
        <span>✓ Item added to your cart</span>
        <button onClick={closeToast}>✕</button>
      </div>

      {/* Product Info */}
      <div className="cart-toast-body">
        <img src={product.image} alt={product.name} />
        <div>
          <h6>{product.name}</h6>
          <p>Shoe size: {size}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="cart-toast-actions">
        <button
          className="outline"
          onClick={() => {
            closeToast();
            navigate("/cart");
          }}
        >
          View cart
        </button>

        <button
          className="primary"
          onClick={() => {
            closeToast();
            navigate("/cart");
          }}
        >
          Check out
        </button>
      </div>

      <div
        className="continue"
        onClick={closeToast}
      >
        Continue shopping
      </div>
    </div>
  );
};

export default CartToast;
