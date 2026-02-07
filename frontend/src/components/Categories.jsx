import "./Categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Men",
    path: "/men",
    title: "Shop for Men",
    desc: "Explore latest trends & essentials",
    image:
      "https://m.media-amazon.com/images/I/717kxMoZiAL._UL1500_.jpg",
  },
  {
    name: "Women",
    path: "/women",
    title: "Shop for Women",
    desc: "Discover stylish outfits & ethnic wear",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.San7tyGGuzeWuCnwbIRruwHaLG",
  },
];

function Categories() {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h2 className="category-title">Shop by Category</h2>

      <div className="row g-5 justify-content-center">
        {categories.map((cat) => (
          <div key={cat.name} className="col-md-5 col-lg-4">
            <div
              className="category-card"
              role="button"
              tabIndex={0}
              style={{ "--bg-image": `url(${cat.image})` }}
              onClick={() => navigate(cat.path)}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(cat.path)
              }
            >
              <div className="category-overlay">
                <h4>{cat.title}</h4>
                <p>{cat.desc}</p>
                <button
                  className="category-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(cat.path);
                  }}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
