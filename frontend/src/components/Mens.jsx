import { useEffect, useState } from "react";
import CollectionHero from "./CollectionHero";
import ProductCard from "./ProductCard";
import BrandStory from "./BrandStory";

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
  overlay={0.55}
  slides={[
    {
      image: "https://tse4.mm.bing.net/th/id/OIP.hw3RcyX4kR_nGn0ejkBwSgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Urban Essentials",
      description: "Minimal, sharp and designed for everyday confidence."
    },
    {
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D",
      title: "Street Ready",
      description: "Modern fits inspired by street culture and comfort."
    },
    {
      image: "https://tse1.mm.bing.net/th/id/OIP.pFz7OqYIutL-GYODfw8ZrwHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3",
      title: "Premium Classics",
      description: "Timeless fashion crafted with premium fabrics."
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

export default Mens;
