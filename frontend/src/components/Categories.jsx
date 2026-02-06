import "./categories.css";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h2 className="text-center fw-semibold mb-5 category-title">
        Shop by Category
      </h2>

      <div className="row g-4">
        {/* Men */}
        <div className="col-md-4">
          <div
            className="category-card"
            style={{
              backgroundImage:
                "url('https://m.media-amazon.com/images/I/717kxMoZiAL._UL1500_.jpg')",
            }}
          >
            <div className="category-overlay">
              <h4>Shop for Men</h4>
              <p>Explore latest trends & essentials</p>
              <button
                className="category-btn"
                onClick={() => navigate("/men")}
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Women */}
        <div className="col-md-4">
          <div
            className="category-card"
            style={{
              backgroundImage:
                "url('https://tse2.mm.bing.net/th/id/OIP.San7tyGGuzeWuCnwbIRruwHaLG?rs=1&pid=ImgDetMain&o=7&rm=3')",
            }}
          >
            <div className="category-overlay">
              <h4>Shop for Women</h4>
              <p>Discover stylish outfits & ethnic wear</p>
              <button
                className="category-btn"
                onClick={() => navigate("/women")}
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Kids */}
        <div className="col-md-4">
          <div
            className="category-card"
            style={{
              backgroundImage:
                "url('https://tse1.mm.bing.net/th/id/OIP.1I89c8bHfz9Egjw4xfirPgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3')",
            }}
          >
            <div className="category-overlay">
              <h4>Shop for Kids</h4>
              <p>Cute, comfy & playful styles</p>
              <button
                className="category-btn"
                onClick={() => navigate("/kids")}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
