
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../context/CartContent";

function Navbar({ search = "", setSearch }) {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);

  // Calculate total cart items
  const cartCount = cart.reduce(
    (total, product) =>
      total + (product.quantity || 1),
    0
  );

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Handle search
  const handleSearch = (e) => {
    if (setSearch) {
      setSearch(e.target.value);
    }
  };

  // Search on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
    }
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        Shopify 🛍️
      </Link>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />

      {/* NAVIGATION LINKS */}
      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart 🛒 ({cartCount})
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
