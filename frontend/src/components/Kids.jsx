import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import CollectionHero from "./CollectionHero";

function Kids() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products?category=kids")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <CollectionHero
        title="Kids' Collection"
        description="Cute, comfy and playful styles designed to keep kids happy all day long."
        image="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea"
        overlay={0.35}
      />

      <div className="container my-5">
        {loading ? (
          <h5 className="text-center">Loading products...</h5>
        ) : (
          <div className="row g-4">
            {products.map(item => (
              <div className="col-md-3" key={item._id}>
                {/* ✅ USE ProductCard HERE */}
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Kids;
