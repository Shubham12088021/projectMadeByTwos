import { Link, useNavigate, NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  // 🔥 SINGLE SOURCE OF TRUTH
  const { cartCount, animateBadge } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("cartCount");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary shadow-sm premium-navbar">
      <div className="container">
        <div className="row w-100 align-items-center">

          {/* LEFT */}
          <div className="col-8 d-flex align-items-center">
            <Link
              to="/"
              className="navbar-brand fw-bold fs-4 text-dark text-decoration-none brand-logo"
            >
              MyStore
            </Link>

            <ul className="navbar-nav flex-row gap-4 ms-3">
              <li className="nav-item">
                <NavLink className="nav-link premium-link" to="/" end>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link premium-link" to="/men">
                  Men
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link premium-link" to="/women">
                  Women
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link premium-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link premium-link" to="/aboutus">
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="col-4 d-flex justify-content-end align-items-center gap-3">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="btn btn-dark d-flex align-items-center gap-2 px-3 rounded-pill"
              >
                <FaUserCircle size={18} />
                Login
              </Link>
            ) : (
              <>
                {/* 🛒 CART */}
                <Link
                  to="/cart"
                  className={`cart-btn amazon-cart ${
                    animateBadge ? "pulse" : ""
                  }`}
                >
                  <div className="cart-icon-wrapper">
                    <FaShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="amazon-cart-badge">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
