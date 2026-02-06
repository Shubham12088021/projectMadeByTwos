import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./productDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [size, setSize] = useState(8);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedImg(data.image);
      });
  }, [id]);

  const addToCartHandler = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product._id,
        qty: qty,
        size: size,
      }),
    });

    if (res.ok) {
      alert("Product added to cart 🛒");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to add product");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};


  if (!product) {
    return <h4 className="text-center my-5">Loading...</h4>;
  }



  // temporary gallery (future me backend se aayega)
  const galleryImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <div className="container product-detail">
      <div className="row align-items-start">
        {/* LEFT : IMAGE + THUMBNAILS */}
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

        {/* RIGHT : PRODUCT INFO */}
        <div className="col-md-6 product-info-box">
          <h2 className="product-title">{product.name}</h2>

          {/* Rating */}
          <div className="rating">
            ★★★★☆ <span>({product.numReviews} ratings)</span>
          </div>

          {/* Price */}
          <div className="price-section">
            <span className="price">₹{product.price}</span>
            <span className="tax">Inclusive of all taxes</span>
          </div>

          {/* Description */}
          <p className="description">
            {product.description ||
              "Premium sneakers crafted with breathable material, cushioned sole and superior grip. Perfect for daily wear, travel and casual outings."}
          </p>

          {/* Size */}
          <div className="size-section">
            <h6>Select Shoe Size</h6>
            <div className="sizes">
              {[6, 7, 8, 9, 10].map(s => (
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
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Add to cart */}
          <button
  className="add-to-cart-btn"
  onClick={addToCartHandler}
>
  ADD TO CART
</button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
