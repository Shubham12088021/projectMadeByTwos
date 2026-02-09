import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./productDetail.css";
import { toast } from "react-toastify";
import CartToast from "./CartToast";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [size, setSize] = useState(8);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔥 IMPORTANT
  const { syncCart, increaseCart } = useCart();

  /* BUY NOW */
  const buyNowHandler = () => {
    toast.info("Buy Now coming soon 🚀", { autoClose: 1500 });
  };

  /* FETCH PRODUCT */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(res.data);
        setSelectedImg(res.data.image);
      } catch {
        toast.error("Failed to load product");
        setProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ADD TO CART */
  const addToCartHandler = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please login to add items to cart");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          qty,
          size,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 🔥 INSTANT BADGE UPDATE
      increaseCart(qty);

      // 🔒 BACKEND SYNC (FINAL TRUTH)
      syncCart();

      toast(
        ({ closeToast }) => (
          <CartToast
            product={product}
            size={size}
            closeToast={closeToast}
          />
        ),
        {
          autoClose: 2000,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          position: "top-right",
          className: "cart-toast-wrapper",
        }
      );
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* UI STATES */
  if (product === false) {
    return <h4 className="text-center my-5">Product not found ❌</h4>;
  }

  if (!product) {
    return <h4 className="text-center my-5">Loading...</h4>;
  }

  const discountPercent = 20;
  const oldPrice = product.price;
  const newPrice = Math.round(oldPrice * (1 - discountPercent / 100));

  return (
    <div className="container product-detail">
      <div className="row align-items-start">

        {/* LEFT IMAGE */}
        <div className="col-md-6">
          <div className="image-section">
            <div className="image-wrapper">
              <img src={selectedImg} alt={product.name} />
            </div>

            <div className="thumbnail-row">
              {(product.images?.length
                ? product.images
                : [product.image, product.image, product.image, product.image]
              )
                .slice(0, 4)
                .map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail-box ${
                      selectedImg === img ? "active" : ""
                    }`}
                    onClick={() => setSelectedImg(img)}
                  >
                    <img src={img} alt="thumb" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT INFO */}
        <div className="col-md-6 product-info-box">
          <h2 className="product-title">{product.name}</h2>

          <div className="rating">
            ★★★★☆ <span>({product.numReviews} ratings)</span>
          </div>

          <div className="price-section">
            <div className="price-row">
              <span className="price">₹{newPrice}</span>
              <span className="old-price">₹{oldPrice}</span>
            </div>

            <div className="discount-box">{discountPercent}% OFF</div>
            <span className="tax">Inclusive of all taxes</span>
          </div>

          <p className="description">
            {product.description ||
              "Premium sneakers crafted with breathable material, cushioned sole and superior grip."}
          </p>

          <div className="size-section">
            <h6>Shoe Size</h6>
            <div className="sizes">
              {[6, 7, 8, 9, 10].map((s) => (
                <button
                  key={s}
                  className={size === s ? "active" : ""}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="qty-section">
            <h6>Quantity</h6>
            <div className="qty-control">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
                -
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="add-to-cart-btn"
              onClick={addToCartHandler}
              disabled={loading}
            >
              {loading ? "Adding..." : "ADD TO CART"}
            </button>

            <button className="buy-now-btn" onClick={buyNowHandler}>
              BUY NOW
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;
