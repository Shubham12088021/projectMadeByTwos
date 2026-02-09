import { useEffect, useState } from "react";
import CollectionHero from "./CollectionHero";
import ProductCard from "./ProductCard";
import BrandStory from "./BrandStory";

function Womens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products?category=women")
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
        overlay={0.45}
        slides={[
          {
            image: "https://tse1.mm.bing.net/th/id/OIP.p2pMi7fQ9Dl7FTKH7u4eegHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Elegant Essentials",
            description:
              "Refined styles designed to elevate your everyday elegance."
          },
          {
            image: "https://tse3.mm.bing.net/th/id/OIP.i2MDujBmf1C9WPhkZVFcWgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Modern Grace",
            description:
              "Soft silhouettes and modern cuts made for confident women."
          },
          {
            image: "https://tse4.mm.bing.net/th/id/OIP.BbbPVzNrA5LMj-7tPI14RgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
            title: "Timeless Trends",
            description:
              "Classic fashion blended with contemporary trends."
          }
        ]}
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

      {/* BRAND STORY */}
      <BrandStory />
    </>
  );
}

export default Womens;
