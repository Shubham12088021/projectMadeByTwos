import { useEffect, useState } from "react";
import CollectionHero from "./CollectionHero";
import ProductCard from "./ProductCard";
import BrandStory from "./BrandStory";   // ✅ ADD THIS

function Mens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products?category=men")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* HERO */}
      <CollectionHero
        title="Men's Collection"
        description="Discover premium styles for modern men."
        image="https://images.unsplash.com/photo-1520975916090-3105956dac38"
        overlay={0.55}
      />

      {/* PRODUCTS */}
      <div className="container my-5">
        {loading ? (
          <h5 className="text-center">Loading products...</h5>
        ) : (
          <div className="row g-4">
            {products.map(item => (
              <div className="col-md-3" key={item._id}>
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ BRAND STORY (MEN CONTENT WILL SHOW HERE) */}
      <BrandStory />
    </>
  );
}

export default Mens;
