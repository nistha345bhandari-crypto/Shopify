
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContent";

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  // ADD TO CART
  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart(product);

    alert(`${product.name} added to cart! 🛒`);
  };

  // VIEW PRODUCT DETAILS
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">

      {/* PRODUCT IMAGE */}
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-card-content">

        <h2>{product.name}</h2>

        <p>₹{product.price}</p>

        {/* ADD TO CART BUTTON */}
        <button onClick={handleAddToCart}>
          Add to Cart
        </button>

        {/* VIEW DETAILS BUTTON */}
        <button onClick={handleViewDetails}>
          View Details
        </button>

      </div>

    </div>
  );
}

export default ProductCard;
