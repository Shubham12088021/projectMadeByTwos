import "./categories.css";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h2 className="text-center fw-semibold mb-5 category-title">
        Shop by Category
      </h2>

      {/* Centered row */}
      <div className="row g-5 justify-content-center">
        {/* Men */}
        <div className="col-md-5 col-lg-4">
          <div
            className="category-card men"
            onClick={() => navigate("/men")}
            style={{
              backgroundImage:
                "url('https://m.media-amazon.com/images/I/717kxMoZiAL._UL1500_.jpg')",
            }}
          >
            <div className="category-overlay">
              <h4>Shop for Men</h4>
              <p>Explore latest trends & essentials</p>
              <button className="category-btn">Explore</button>
            </div>
          </div>
        </div>

        {/* Women */}
        <div className="col-md-5 col-lg-4">
          <div
            className="category-card women"
            onClick={() => navigate("/women")}
            style={{
              backgroundImage:
                "url('https://tse2.mm.bing.net/th/id/OIP.San7tyGGuzeWuCnwbIRruwHaLG?rs=1&pid=ImgDetMain&o=7&rm=3')",
            }}
          >
            <div className="category-overlay">
              <h4>Shop for Women</h4>
              <p>Discover stylish outfits & ethnic wear</p>
              <button className="category-btn">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
