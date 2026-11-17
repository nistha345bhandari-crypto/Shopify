
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      const cleanUsername = username.trim();
      const cleanEmail = email.trim().toLowerCase();

      // Check if email already exists
      const existingUser = users.find(
        (user) => user.email.toLowerCase() === cleanEmail
      );

      if (existingUser) {
        alert("Email already registered!");
        return;
      }

      // Create new user
      const newUser = {
        username: cleanUsername,
        email: cleanEmail,
        password: password
      };

      // Save user
      users.push(newUser);

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      alert("Signup successful! 🎉");

      navigate("/login");

    } catch (error) {
      console.error("Signup error:", error);
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
          <p className="auth-label">JOIN SHOPIFY</p>

          <h1>Create Account</h1>

          <p className="auth-description">
            Sign up to start shopping.
          </p>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

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
              minLength={6}
            />

            <button type="submit">
              Sign Up
            </button>
          </form>

          <div className="auth-link">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
