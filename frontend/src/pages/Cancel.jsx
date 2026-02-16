import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        ❌ Payment Cancelled
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        Your payment was not completed.
      </p>

      <button
        onClick={() => navigate("/cart")}
        style={{
          padding: "12px 25px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Back to Cart
      </button>
    </div>
  );
};

export default Cancel;
