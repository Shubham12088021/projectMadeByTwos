import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [countdown, setCountdown] = useState(3);
  const [message, setMessage] = useState("Processing your order...");

  useEffect(() => {
    const saveOrder = async () => {
      try {
        const sessionId = new URLSearchParams(location.search).get("session_id");
        const token = localStorage.getItem("token");

        if (!sessionId) {
          setMessage("Invalid session.");
          return;
        }

        await axios.post(
          "http://localhost:5000/api/orders/save-stripe-order",
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("🎉 Payment Successful!");

        // Start countdown
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              navigate("/");
            }
            return prev - 1;
          });
        }, 1000);

      } catch (error) {
        console.error(error);
        setMessage("Something went wrong while saving order.");
      }
    };

    saveOrder();
  }, [location, navigate]);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <h1>{message}</h1>

      {message.includes("Successful") && (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          Redirecting to home in <strong>{countdown}</strong> second{countdown !== 1 ? "s" : ""}...
        </p>
      )}
    </div>
  );
};

export default Success;
