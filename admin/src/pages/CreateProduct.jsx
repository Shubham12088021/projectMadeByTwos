import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateProduct() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
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

      toast.success("Product Created Successfully 🚀");
      navigate("/products");

    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Create Product</h2>

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
          Create Product
        </button>
      </form>
    </div>
  );
}

/* 🔥 Reusable Input */
function Input({ label, type = "text", value, setValue }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={inputStyle}
        required
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
  background: "linear-gradient(135deg, #16a34a, #15803d)",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default CreateProduct;
