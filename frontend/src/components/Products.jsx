import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Products.css";
import { toast } from "react-toastify";

const Products = ({ category }) => {
  const [products, setProducts] = useState(null); // null = loading
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products`,
          {
            params: category ? { category } : {},
          }
        );

        setProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
        setError(true);
        setProducts([]); // 🔴 stop infinite loading
      }
    };

    fetchProducts();
  }, [category]);

  /* ---------- UI STATES ---------- */

  if (error) {
    return (
      <h4 className="text-center my-5">
        Failed to load products ❌
      </h4>
    );
  }

  if (products === null) {
    return (
      <h4 className="text-center my-5">
        Loading...
      </h4>
    );
  }

  if (products.length === 0) {
    return (
      <h4 className="text-center my-5">
        No products found
      </h4>
    );
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
