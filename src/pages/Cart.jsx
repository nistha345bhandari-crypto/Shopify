
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContent";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Calculate total price
  const total = cart.reduce(
    (sum, product) =>
      sum + product.price * (product.quantity || 1),
    0
  );

  // Calculate total items
  const totalItems = cart.reduce(
    (sum, product) =>
      sum + (product.quantity || 1),
    0
  );

  // Place Order
  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-page">

      {/* Continue Shopping */}
      <button
        className="back-button"
        onClick={() => navigate("/products")}
      >
        ← Continue Shopping
      </button>

      <h1>My Cart 🛒</h1>

      {cart.length === 0 ? (

        /* EMPTY CART */
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <p>
            Add some products to get started.
          </p>

          <button
            onClick={() => navigate("/products")}
          >
            Shop Products
          </button>
        </div>

      ) : (

        <>

          {/* CART ITEMS */}
          <div className="cart-items">

            {cart.map((product) => (

              <div
                className="cart-item"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="cart-item-info">

                  <h2>{product.name}</h2>

                  <p>Price: ₹{product.price}</p>

                  {/* QUANTITY CONTROL */}
                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {product.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <p>
                    Subtotal: ₹
                    {product.price * (product.quantity || 1)}
                  </p>

                </div>

                {/* REMOVE BUTTON */}
                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(product.id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          {/* CART SUMMARY */}
          <div className="cart-summary">

            <div>
              <p>Total Items: {totalItems}</p>

              <p>Order Total</p>

              <h2>₹{total}</h2>
            </div>

            {/* CART ACTIONS */}
            <div className="cart-actions">

              <button
                className="clear-cart"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear your cart?"
                    )
                  ) {
                    clearCart();
                  }
                }}
              >
                Clear Cart
              </button>

              <button
                className="place-order"
                onClick={handleOrder}
              >
                Place Order
              </button>

            </div>

          </div>

        </>
      )}

    </div>
  );
}

export default Cart;
