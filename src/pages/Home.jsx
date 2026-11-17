
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import blush from "../assets/Blush.jpg";
import concealor from "../assets/concealor.jpg";
import eyeliner from "../assets/eyeliner.jpg";
import eyeshadow from "../assets/eyeshadow.jpg";
import lipstick from "../assets/lipstick.jpg";

function Home() {
  const trendingProducts = [
    {
      id: 1,
      name: "Classic Red Lipstick",
      image: lipstick
    },
    {
      id: 3,
      name: "Blush",
      image: blush
    },
    {
      id: 5,
      name: "Eyeliner",
      image: eyeliner
    },
    {
      id: 4,
      name: "Concealer",
      image: concealor
    },
    {
      id: 6,
      name: "Eyeshadow",
      image: eyeshadow
    }
  ];

  return (
    <div className="home">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <p className="hero-small">
          SHOPIFY • BEAUTY COLLECTION
        </p>

        <h1>
          Find Your Perfect
          <br />
          Beauty Products ✨
        </h1>

        <p>
          Explore our collection of
          beauty and makeup products.
        </p>

        <Link to="/products" className="shop-button">
          Shop Now
        </Link>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="trending-section">
        <div className="section-heading">
          <p>OUR SELECTION</p>
          <h2>Shop Trending Products</h2>
        </div>

        <div className="trending-products">
          {trendingProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="trending-card"
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <div className="trending-name">
                {product.name}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
