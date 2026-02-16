import "./NewArrivals.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewArrivals() {
  const [activeTab, setActiveTab] = useState("men");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* 🔁 Fetch Products */
  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/api/products?category=${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ Your API returns: { currentPage, products, totalPages, totalProducts }
        const safeProducts = Array.isArray(data.products)
          ? data.products
          : [];

        setProducts(safeProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setProducts([]);
        setLoading(false);
      });
  }, [activeTab]);

  const handleViewAll = () => {
    navigate(`/${activeTab}`);
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        Loading products...
      </div>
    );
  }

  return (
    <div className="container my-5 new-arrivals-section">
      <h2 className="text-center fw-semibold mb-4">
        New Arrivals
      </h2>

      {/* 🔹 Tabs */}
      <div className="d-flex justify-content-center gap-4 mb-4 arrivals-tabs">
        <span
          className={activeTab === "men" ? "active" : ""}
          onClick={() => setActiveTab("men")}
          style={{ cursor: "pointer" }}
        >
          Men's Collection
        </span>

        <span
          className={activeTab === "women" ? "active" : ""}
          onClick={() => setActiveTab("women")}
          style={{ cursor: "pointer" }}
        >
          Women's Collection
        </span>
      </div>

      {/* 🔹 Products */}
      <div className="row g-4">
        {products.length === 0 && (
          <div className="text-center">
            No products found
          </div>
        )}

        {products.slice(0, 5).map((item, index) => {
          const price = Number(item?.price) || 0;
          const newPrice = Math.round(price * 0.8);

          // ✅ Rating clamp (0 to 5)
          const safeRating = Math.min(
            Math.max(Math.round(Number(item?.rating) || 0), 0),
            5
          );

          return (
            <div className="col-md-4" key={item?._id || index}>
              <div
                className="product-card"
                onClick={() =>
                  item?._id &&
                  navigate(`/product/${item._id}`)
                }
                style={{ cursor: "pointer" }}
              >
                <span className="badge-new">
                  NEW ARRIVAL
                </span>

                <div className="img-wrapper">
                  <img
                    src={item?.image || ""}
                    alt={item?.name || "Product"}
                    className="product-img"
                  />
                </div>

                <div className="product-info">
                  <h6 className="product-name">
                    {item?.name || "Unnamed Product"}
                  </h6>

                  <div className="rating">
                    {"★".repeat(safeRating)}
                    {"☆".repeat(5 - safeRating)}
                    <span className="review-count">
                      ({item?.numReviews || 0})
                    </span>
                  </div>

                  <div className="price-box">
                    <div className="price-row">
                      <span className="old-price">
                        ₹{price}
                      </span>
                      <span className="new-price">
                        ₹{newPrice}
                      </span>
                    </div>

                    <div className="discount-box">
                      20% OFF
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 View All */}
      <div className="text-center mt-5">
        <button
          className="btn btn-dark px-4 view-all-btn"
          onClick={handleViewAll}
        >
          VIEW ALL
        </button>
      </div>
    </div>
  );
}

export default NewArrivals;
