import "./newArrivals.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewArrivals() {
  const [activeTab, setActiveTab] = useState("men");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 🔁 jab tab change ho, backend se data lao
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
    <div className="container my-5">
      <h2 className="text-center fw-semibold mb-4">New Arrivals</h2>

      {/* TABS */}
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

      {/* PRODUCTS (ONLY FIRST 3 FROM THAT PAGE DATA) */}
      <div className="row g-4">
        {products.slice(0, 5).map(item => (
          <div className="col-md-4" key={item._id}>
            <div className="product-card">
              <span className="badge-new">NEW ARRIVAL</span>

              <img src={item.image} alt={item.name} />

              {/* NAME */}
              <h6 className="product-name">{item.name}</h6>

              {/* ⭐ RATING */}
              <div className="rating">
                {"★".repeat(Math.round(item.rating))}
                {"☆".repeat(5 - Math.round(item.rating))}
                <span className="review-count">
                  ({item.numReviews})
                </span>
              </div>

              {/* PRICE */}
              <p className="price">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>


      {/* VIEW ALL */}
      <div className="text-center mt-4">
        <button className="btn btn-dark px-4" onClick={handleViewAll}>
          VIEW ALL
        </button>
      </div>
    </div>
  );
}

export default NewArrivals;
