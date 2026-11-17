
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CartContext } from "../context/CartContent";

import lipstick from "../assets/lipstick.jpg";
import blush from "../assets/Blush.jpg";
import eyeliner from "../assets/eyeliner.jpg";
import concealor from "../assets/concealor.jpg";
import eyeshadow from "../assets/eyeshadow.jpg";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  // All six products
  const products = [
    {
      id: 1,
      name: "Classic Red Lipstick",
      price: 499,
      image: lipstick,
      description:
        "Long-lasting lipstick with a smooth and beautiful finish.",
      category: "Lips",
      rating: 4.5
    },
    {
      id: 2,
      name: "Nude Brown Lipstick",
      price: 399,
      image: lipstick,
      description:
        "A beautiful nude brown lipstick for everyday looks.",
      category: "Lips",
      rating: 4.4
    },
    {
      id: 3,
      name: "Blush",
      price: 399,
      image: blush,
      description:
        "Soft blush that gives your cheeks a natural and beautiful glow.",
      category: "Face",
      rating: 4.4
    },
    {
      id: 4,
      name: "Concealer",
      price: 599,
      image: concealor,
      description:
        "Lightweight concealer for an even-looking complexion.",
      category: "Face",
      rating: 4.7
    },
    {
      id: 5,
      name: "Eyeliner",
      price: 299,
      image: eyeliner,
      description:
        "Smooth eyeliner for a defined and attractive eye look.",
      category: "Eyes",
      rating: 4.6
    },
    {
      id: 6,
      name: "Eyeshadow",
      price: 699,
      image: eyeshadow,
      description:
        "Beautiful eyeshadow shades for everyday and party looks.",
      category: "Eyes",
      rating: 4.5
    }
  ];

  // Find selected product
  const product = products.find(
    (product) => product.id === Number(id)
  );

  // If product does not exist
  if (!product) {
    return (
      <div className="not-found">
        <h1>Product not found</h1>

        <button onClick={() => navigate("/products")}>
          ← Back to Products
        </button>
      </div>
    );
  }

  // Product images
  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  const mainImage = selectedImage || product.image;

  // Add product to cart according to quantity
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    alert(`${product.name} added to cart! 🛒`);
  };

  // Buy Now
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    navigate("/checkout");
  };

  return (
    <div className="details-page">

      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>

      <div className="product-details">

        {/* IMAGE SECTION */}
        <div className="details-gallery">

          <img
            className="main-product-image"
            src={mainImage}
            alt={product.name}
          />

          <div className="thumbnail-container">

            {productImages.map((image, index) => (
              <button
                key={index}
                className={
                  selectedImage === image
                    ? "thumbnail active"
                    : "thumbnail"
                }
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                />
              </button>
            ))}

          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="details-info">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="details-rating">
            ⭐ {product.rating} / 5
          </div>

          <h2>₹{product.price}</h2>

          <p className="details-description">
            {product.description}
          </p>

          {/* QUANTITY SECTION */}
          <div className="quantity-section">

            <span>Quantity</span>

            <div className="quantity-control">

              <button
                onClick={() =>
                  setQuantity((previous) =>
                    Math.max(1, previous - 1)
                  )
                }
                disabled={quantity === 1}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((previous) => previous + 1)
                }
              >
                +
              </button>

            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="details-actions">

            <button
              className="details-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              className="details-buy"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

          </div>

          <p className="details-total">
            Total: ₹{product.price * quantity}
          </p>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
