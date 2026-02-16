import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  // 🔥 Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setImage(data.image);
        setDescription(data.description);
        setDiscount(data.discount || 0);
        setRating(data.rating || 0);
        setNumReviews(data.numReviews || 0);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔥 Submit update
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          name,
          price,
          category,
          image,
          description,
          discount,
          rating,
          numReviews,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product updated successfully 🚀");
      navigate("/products");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  return (
    <div style={containerStyle}>
      <h2>Edit Product</h2>

      <form onSubmit={submitHandler} style={formStyle}>
        <Input label="Product Name" value={name} setValue={setName} />
        <Input label="Price" type="number" value={price} setValue={setPrice} />
        <Input label="Category" value={category} setValue={setCategory} />
        <Input label="Image URL" value={image} setValue={setImage} />
        <Input label="Discount (%)" type="number" value={discount} setValue={setDiscount} />
        <Input label="Rating" type="number" value={rating} setValue={setRating} />
        <Input label="Number of Reviews" type="number" value={numReviews} setValue={setNumReviews} />

        <div style={{ marginBottom: "20px" }}>
          <label>Description</label>
          <textarea
            style={textareaStyle}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Update Product
        </button>
      </form>
    </div>
  );
}

/* 🔥 Reusable Input Component */
function Input({ label, type = "text", value, setValue }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const containerStyle = {
  padding: "40px",
  maxWidth: "600px",
};

const formStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "6px",
  border: "1px solid #ddd",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  minHeight: "100px",
};

const buttonStyle = {
  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default EditProduct;
