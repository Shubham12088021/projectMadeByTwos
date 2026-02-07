import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary shadow-sm premium-navbar">
      <div className="container">
        <div className="row w-100 align-items-center">

          {/* LEFT SECTION */}
          <div className="col-8 d-flex align-items-center">
            <Link
              to="/"
              className="navbar-brand fw-bold fs-4 text-dark text-decoration-none brand-logo"
            >
              MyStore
            </Link>

            <ul className="navbar-nav flex-row gap-4 ms-3">
              <li className="nav-item">
                <Link className="nav-link premium-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link premium-link" to="/men">
                  Men
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link premium-link" to="/women">
                  Women
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT SECTION */}
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
                <Link to="/cart" className="cart-btn d-flex align-items-center gap-2">
                  <FaShoppingCart size={18} />
                  Cart
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
