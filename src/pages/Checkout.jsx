
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContent";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Calculate total price
  const total = cart.reduce(
    (sum, product) =>
      sum + product.price * (product.quantity || 1),
    0
  );

  // Handle order submission
  const handleOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/products");
      return;
    }

    if (
      name.trim() === "" ||
      address.trim() === "" ||
      !/^[0-9]{10}$/.test(phone)
    ) {
      alert("Please enter valid details!");
      return;
    }

    // Order confirmation
    alert(
      `Order placed successfully! 🎉

Thank you, ${name}!

Your order total is ₹${total}.

Your order will be delivered to:
${address}`
    );

    // Clear cart after successful order
    clearCart();

    // Navigate to homepage
    navigate("/");
  };

  // Empty cart condition
  if (cart.length === 0) {
    return (
      <div className="checkout-page empty-checkout">

        <h1>Your cart is empty</h1>

        <p>Add some products before checkout.</p>

        <button onClick={() => navigate("/products")}>
          Shop Products
        </button>

      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate("/cart")}
      >
        ← Back to Cart
      </button>

      <div className="checkout-container">

        {/* CHECKOUT INFORMATION */}
        <div className="checkout-info">

          <p>COMPLETE YOUR ORDER</p>

          <h1>Checkout 🛍️</h1>

          <p>
            Enter your details to complete your purchase.
          </p>

        </div>

        {/* CHECKOUT FORM */}
        <form
          className="checkout-form"
          onSubmit={handleOrder}
        >

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Enter your 10-digit phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}"
            maxLength="10"
            title="Enter a valid 10 digit phone number"
            required
          />

          {/* ORDER SUMMARY */}
          <div className="checkout-total">

            <span>Total Amount</span>

            <strong>₹{total}</strong>

          </div>

          <button type="submit">
            Place Order
          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;
