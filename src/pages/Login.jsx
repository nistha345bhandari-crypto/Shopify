
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const user = users.find(
        (user) =>
          user.email.toLowerCase() === email.trim().toLowerCase() &&
          user.password === password
      );

      if (user) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(user)
        );

        alert("Login Successful! 🎉");
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-image">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
            alt="Beauty"
          />

          <div className="auth-image-content">
            <h1>Shopify</h1>
            <p>BEAUTY. SIMPLICITY. YOU.</p>
          </div>
        </div>

        <div className="auth-form">
          <p className="auth-label">WELCOME BACK</p>

          <h1>Welcome Back</h1>

          <p className="auth-description">
            Login to continue shopping.
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              Login
            </button>
          </form>

          <div className="auth-link">
            Don't have an account?{" "}
            <Link to="/signup">Sign up</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
