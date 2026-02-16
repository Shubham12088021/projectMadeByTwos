import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div
        style={{
          ...sidebarStyle,
          width: open ? "240px" : "75px",
        }}
      >
        {/* Top */}
        <div style={sidebarTop}>
          {open && <h2 style={logoStyle}>Admin</h2>}
          <button
            style={toggleBtn}
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Menu */}
        <div style={menuStyle}>
          <NavItem
            to="/dashboard"
            label="Dashboard"
            icon="📊"
            open={open}
            active={location.pathname === "/dashboard"}
          />
          <NavItem
            to="/products"
            label="Products"
            icon="📦"
            open={open}
            active={location.pathname === "/products"}
          />
          <NavItem
            to="/create-product"
            label="Add Product"
            icon="➕"
            open={open}
            active={location.pathname === "/create-product"}
          />
          <NavItem
            to="/orders"
            label="Orders"
            icon="🧾"
            open={open}
            active={location.pathname === "/orders"}
          />
        </div>

        {/* Logout */}
        <button style={logoutStyle} onClick={logoutHandler}>
          {open ? "Logout" : "🚪"}
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          ...contentStyle,
          marginLeft: open ? "240px" : "75px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Nav Item ---------- */

function NavItem({ to, label, icon, open, active }) {
  return (
    <Link
      to={to}
      style={{
        ...navItemStyle,
        background: active
          ? "rgba(255,255,255,0.18)"
          : "transparent",
      }}
    >
      <span style={{ fontSize: "20px" }}>{icon}</span>
      {open && <span>{label}</span>}
    </Link>
  );
}

/* ---------- Styles ---------- */

const sidebarStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  height: "100vh",
  background: "linear-gradient(180deg, #1e3a8a, #0f172a)",
  color: "white",
  padding: "20px 15px",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
};

const sidebarTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
};

const logoStyle = {
  margin: 0,
  fontWeight: "600",
};

const toggleBtn = {
  background: "none",
  border: "none",
  color: "white",
  fontSize: "20px",
  cursor: "pointer",
};

const menuStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flex: 1,
};

const navItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 14px",
  borderRadius: "10px",
  color: "white",
  textDecoration: "none",
  transition: "0.2s ease",
};

const logoutStyle = {
  marginTop: "auto",
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
};

const contentStyle = {
  flex: 1,
  padding: "40px",
  background: "#f8fafc",
  minHeight: "100vh",
  transition: "margin-left 0.3s ease",
};

export default AdminLayout;
