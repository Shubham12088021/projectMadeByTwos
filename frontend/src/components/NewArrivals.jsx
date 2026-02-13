import "./newArrivals.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewArrivals() {
  const [activeTab, setActiveTab] = useState("men");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  /* 🔁 Fetch Products */
  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=${activeTab}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [activeTab]);

  const handleViewAll = () => {
    navigate(`/${activeTab}`);
  };

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
        >
          Men's Collection
        </span>

        <span
          className={activeTab === "women" ? "active" : ""}
          onClick={() => setActiveTab("women")}
        >
          Women's Collection
        </span>
      </div>

      {/* 🔹 Products */}
      <div className="row g-4">
        {products.slice(0, 6).map(item => {
          const discountPercent = 20;
          const oldPrice = item.price;
          const newPrice = Math.round(
            oldPrice * (1 - discountPercent / 100)
          );

          return (
            <div className="col-md-4" key={item._id}>
              <div
                className="product-card"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <span className="badge-new">
                  NEW ARRIVAL
                </span>

                <div className="img-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-img"
                  />
                </div>

                <div className="product-info">
                  <h6 className="product-name">
                    {item.name}
                  </h6>

                  <div className="rating">
                    {"★".repeat(Math.round(item.rating || 4))}
                    {"☆".repeat(5 - Math.round(item.rating || 4))}
                    <span className="review-count">
                      ({item.numReviews || 0})
                    </span>
                  </div>

                  {/* 🔥 Discount Pricing */}
                  <div className="price-box">
                    <div className="price-row">
                      <span className="old-price">
                        ₹{oldPrice}
                      </span>
                      <span className="new-price">
                        ₹{newPrice}
                      </span>
                    </div>

                    <div className="discount-box">
                      {discountPercent}% OFF
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 View All Button */}
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
