import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary shadow-sm premium-navbar">
      <div className="container">
        <div className="row w-100 align-items-center">

          {/* LEFT */}
          <div className="col-8 d-flex align-items-center">
            <Link
              className="navbar-brand fw-bold fs-4 text-decoration-none text-dark brand-logo"
              to="/"
            >
              MyStore
            </Link>

            <ul className="navbar-nav flex-row gap-4 ms-3">
              <li className="nav-item">
                <Link className="nav-link premium-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link premium-link" to="/men">
                  Men’s Collection
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link premium-link" to="/women">
                  Women’s Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="col-4 d-flex justify-content-end align-items-center gap-3">
            {!token ? (
              /* ✅ LOGIN — SAME AS BEFORE */
              <Link
                to="/login"
                className="btn btn-dark d-flex align-items-center gap-2 px-3"
                style={{ borderRadius: "30px" }}
              >
                <FaUserCircle size={18} />
                Login
              </Link>
            ) : (
              <>
                {/* CART */}
                <Link
                  to="/cart"
                  className="cart-btn"
                >
                  <FaShoppingCart size={18} />
                  Cart
                </Link>

                {/* LOGOUT */}
                <button
                  className="logout-btn"
                  onClick={logoutHandler}
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
}

export default Navbar;
