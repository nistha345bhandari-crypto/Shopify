
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import lipstick from "../assets/lipstick.jpg";
import blush from "../assets/Blush.jpg";
import eyeliner from "../assets/eyeliner.jpg";
import concealor from "../assets/concealor.jpg";
import eyeshadow from "../assets/eyeshadow.jpg";

function Products() {

  // PRODUCT DATA
  const products = [
    // LIPS
    {
      id: 1,
      name: "Classic Red Lipstick",
      price: 499,
      image: lipstick,
      category: "Lips"
    },
    {
      id: 2,
      name: "Nude Brown Lipstick",
      price: 399,
      image: lipstick,
      category: "Lips"
    },

    // FACE
    {
      id: 3,
      name: "Blush",
      price: 399,
      image: blush,
      category: "Face"
    },
    {
      id: 4,
      name: "Concealer",
      price: 599,
      image: concealor,
      category: "Face"
    },

    // EYES
    {
      id: 5,
      name: "Eyeliner",
      price: 299,
      image: eyeliner,
      category: "Eyes"
    },
    {
      id: 6,
      name: "Eyeshadow",
      price: 699,
      image: eyeshadow,
      category: "Eyes"
    }
  ];

  // RANDOM PRODUCT ORDER
  const [randomProducts] = useState(() => {
    return [...products].sort(
      () => Math.random() - 0.5
    );
  });

  // STATES
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // LOADING AND ERROR HANDLING
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (randomProducts.length === 0) {
          throw new Error("Products could not be loaded.");
        }

        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }, 700);

    return () => clearTimeout(timer);

  }, [randomProducts]);

  // SEARCH AND CATEGORY FILTER
  let filteredProducts = randomProducts.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // SORT PRODUCTS
  if (sort === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  // LOADING SCREEN
  if (loading) {
    return (
      <div>
        <Navbar
          search={search}
          setSearch={setSearch}
        />

        <div className="status-message">
          Loading products...
        </div>
      </div>
    );
  }

  // ERROR SCREEN
  if (error) {
    return (
      <div>
        <Navbar
          search={search}
          setSearch={setSearch}
        />

        <div className="status-message">
          <h1>Something went wrong</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // MAIN PRODUCTS PAGE
  return (
    <div className="products-page">

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <h1>Our Products 🛍️</h1>

      {/* CATEGORY FILTERS */}
      <div className="filters">

        <div className="category-buttons">

          <button
            className={category === "All" ? "active" : ""}
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className={category === "Face" ? "active" : ""}
            onClick={() => setCategory("Face")}
          >
            Face
          </button>

          <button
            className={category === "Eyes" ? "active" : ""}
            onClick={() => setCategory("Eyes")}
          >
            Eyes
          </button>

          <button
            className={category === "Lips" ? "active" : ""}
            onClick={() => setCategory("Lips")}
          >
            Lips
          </button>

        </div>

        {/* PRICE SORTING */}
        <div className="sort">

          <label>Sort:</label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

        </div>

      </div>

      {/* PRODUCT CARDS */}
      <div className="products-container">

        {filteredProducts.length === 0 ? (

          <p className="no-products">
            No products found.
          </p>

        ) : (

          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))

        )}

      </div>

    </div>
  );
}

export default Products;
