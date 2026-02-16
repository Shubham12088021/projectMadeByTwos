import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();

    // 🔥 Auto refresh every 10 seconds
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "40px" }}>

      {/* 🔥 BACK BUTTON */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 15px",
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ← Back to Dashboard
      </button>

      <h2>Order Management</h2>

      <table
        style={{
          marginTop: "20px",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead style={{ background: "#111", color: "#fff" }}>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>User</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Total</th>
            <th style={thStyle}>Items</th>
            <th style={thStyle}>Payment</th>
            <th style={thStyle}>Method</th>
            <th style={thStyle}>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                No orders found
              </td>
            </tr>
          )}

          {orders.map((order) => (
            <tr key={order._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={tdStyle}>{order._id.slice(-6)}</td>
              <td style={tdStyle}>{order.user?.name}</td>
              <td style={tdStyle}>{order.user?.email}</td>
              <td style={tdStyle}>₹{order.totalPrice}</td>
              <td style={tdStyle}>{order.items.length}</td>

              <td style={tdStyle}>
                {order.isPaid ? (
                  <span style={paidStyle}>Paid</span>
                ) : (
                  <span style={unpaidStyle}>Unpaid</span>
                )}
              </td>

              <td style={tdStyle}>{order.paymentMethod || "—"}</td>

              <td style={tdStyle}>
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
};

const paidStyle = {
  background: "green",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const unpaidStyle = {
  background: "red",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

export default OrderManagement;
