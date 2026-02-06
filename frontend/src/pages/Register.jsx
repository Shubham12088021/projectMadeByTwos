import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Account created successfully. Please login.");
            navigate("/login");
        } else {
            alert(data.message || "Registration failed");
        }
    };


    return (
        <div className="auth-page">
            <div className="auth-card">

                {/* Title */}
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
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
