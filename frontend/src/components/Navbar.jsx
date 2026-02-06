import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary shadow-sm">
      <div className="container">
        <div className="row w-100 align-items-center">

          {/* Left */}
          <div className="col-8 d-flex align-items-center">
            <Link
              className="navbar-brand me-4 fw-bold fs-4 text-decoration-none text-dark"
              to="/"
            >
              MyStore
            </Link>

            <ul className="navbar-nav flex-row gap-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/men">Men</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/women">Women</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/kids">Kids</Link>
              </li>
            </ul>
          </div>

          {/* Right */}
          <div className="col-4 d-flex justify-content-end align-items-center gap-3">

            {/* Search */}
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-outline-success">
                Search
              </button>
            </form> */}

            {/* AUTH SECTION */}
            {!token ? (
              <>
                {/* LOGIN BUTTON */}
                <Link
                  to="/login"
                  className="btn btn-dark d-flex align-items-center gap-2 px-3"
                  style={{ borderRadius: "30px" }}
                >
                  <FaUserCircle size={18} />
                  Login
                </Link>

                {/* REGISTER */}
                {/* <Link
                  to="/register"
                  className="btn btn-outline-dark px-3"
                  style={{ borderRadius: "30px" }}
                >
                  Register
                </Link> */}
              </>
            ) : (
              <>
                {/* CART ICON */}
                <Link
                  to="/cart"
                  className="btn btn-outline-dark d-flex align-items-center gap-2 px-3 position-relative"
                  style={{ borderRadius: "30px" }}
                >
                  <FaShoppingCart size={18} />
                  Cart
                </Link>

                {/* LOGOUT */}
                <button
                  className="btn btn-danger px-3"
                  style={{ borderRadius: "30px" }}
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
