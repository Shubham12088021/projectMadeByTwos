import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ ADD
import "./auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { syncCart } = useCart(); // ✅ ADD

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ AUTO LOGIN AFTER REGISTER
        localStorage.setItem("token", data.token);

        // 🔥 SYNC CART (will be 0 for new user, but important)
        await syncCart();

        // ✅ GO HOME
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="title">Create account</h2>
        <br />

        <form onSubmit={submitHandler}>
          <div className="field">
            <label>Full name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn">
            Create account
          </button>
        </form>

        <p className="switch-auth">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
