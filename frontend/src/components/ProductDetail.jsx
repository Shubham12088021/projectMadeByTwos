import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./productDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [size, setSize] = useState(8);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImg(res.data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const addToCartHandler = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/cart/add", // ✅ CORRECT ROUTE
        {
          productId: product._id,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart 🛒");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <h4 className="text-center my-5">Loading...</h4>;
  }

  const galleryImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="container product-detail">
      <div className="row align-items-start">
        {/* LEFT */}
        <div className="col-md-6">
          <div className="image-wrapper">
            <img src={selectedImg} alt={product.name} />
          </div>

          <div className="thumbnail-row">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className={`thumb-box ${
                  selectedImg === img ? "active" : ""
                }`}
                onClick={() => setSelectedImg(img)}
              >
                <img src={img} alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-6 product-info-box">
          <h2 className="product-title">{product.name}</h2>

          <div className="rating">
            ★★★★☆ <span>({product.numReviews} ratings)</span>
          </div>

          <div className="price-section">
            <span className="price">₹{product.price}</span>
            <span className="tax">Inclusive of all taxes</span>
          </div>

          <p className="description">
            {product.description ||
              "Premium sneakers crafted with breathable material, cushioned sole and superior grip."}
          </p>

          {/* Size */}
          <div className="size-section">
            <h6>Select Shoe Size</h6>
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

          {/* Quantity */}
          <div className="qty-section">
            <h6>Quantity</h6>
            <div className="qty-control">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>
                -
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="add-to-cart-btn"
            onClick={addToCartHandler}
            disabled={loading}
          >
            {loading ? "Adding..." : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
