import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?category=${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [category]);

  return (
    <div className="products-container">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
