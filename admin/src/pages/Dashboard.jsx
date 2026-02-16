import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/admin/stats`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStats(data);
            } catch (error) {
                alert("Failed to load dashboard");
            }
        };

        fetchStats();
    }, []);

    if (!stats) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

    return (
        <div style={{ padding: "40px" }}>
            <h1>Admin Dashboard</h1>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: "20px" }}>
                <Card title="Total Products" value={stats.totalProducts} />
                <Card title="Total Users" value={stats.totalUsers} />
                <Card title="Total Orders" value={stats.totalOrders} />
                <Card title="Total Revenue" value={`₹${stats.totalRevenue}`} />
            </div>

        </div>
    );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ color: "#6b7280" }}>{title}</h4>
      <h2 style={{ marginTop: "10px" }}>{value}</h2>
    </div>
  );
}


export default Dashboard;
