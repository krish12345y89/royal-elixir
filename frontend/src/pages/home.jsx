import React, { useState, useEffect, useRef } from "react";
import "./css/home.css";

const SkincareHub = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const footerRef = useRef(null);

  useEffect(() => {
    // Add this to your SkincareHub component
    useEffect(() => {
      // Detect mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // Force dark theme on mobile
        document.body.style.background =
          "linear-gradient(135deg, #0A0E2A 0%, #1A237E 100%)";
        document.body.style.color = "#E5E5E5";

        // Fix all sections
        const sections = document.querySelectorAll(
          ".skin-types, .featured-products, .routine-builder"
        );
        sections.forEach((section) => {
          section.style.background =
            "linear-gradient(135deg, #0A0E2A 0%, #1A237E 100%)";
        });

        // Fix cards
        const cards = document.querySelectorAll(
          ".skin-type-card, .product-card, .routine-step"
        );
        cards.forEach((card) => {
          card.style.background = "rgba(26, 35, 126, 0.9)";
          card.style.color = "#E5E5E5";
        });

        // Fix text colors
        const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headings.forEach((heading) => {
          heading.style.color = "#E8D9B5";
        });

        const paragraphs = document.querySelectorAll("p, li");
        paragraphs.forEach((p) => {
          p.style.color = "rgba(255, 255, 255, 0.9)";
        });
      }
    }, []);

    // Mock data - in real app, this would come from an API
    setFeaturedProducts([
      {
        id: 1,
        name: "Hydrating Serum",
        brand: "Glow Essentials",
        price: "$42.00",
        image: "/api/placeholder/300/300",
        category: "serum",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Vitamin C Cream",
        brand: "Skin Science",
        price: "$58.00",
        image: "/api/placeholder/300/300",
        category: "moisturizer",
        rating: 4.6,
      },
      {
        id: 3,
        name: "Gentle Cleanser",
        brand: "Pure Balance",
        price: "$28.00",
        image: "/api/placeholder/300/300",
        category: "cleanser",
        rating: 4.9,
      },
      {
        id: 4,
        name: "SPF 50 Sunscreen",
        brand: "Sun Shield",
        price: "$35.00",
        image: "/api/placeholder/300/300",
        category: "sunscreen",
        rating: 4.7,
      },
    ]);

    setSkinTypes([
      {
        type: "Dry",
        description: "Products for moisture retention",
        icon: "💧",
      },
      {
        type: "Oily",
        description: "Oil-control solutions",
        icon: "✨",
      },
      {
        type: "Combination",
        description: "Balanced care for mixed skin",
        icon: "⚖️",
      },
      {
        type: "Sensitive",
        description: "Gentle, soothing formulas",
        icon: "🌿",
      },
    ]);
  }, []);

  useEffect(() => {
    // Reveal footer with animation when it enters the viewport
    if (!("IntersectionObserver" in window)) {
      footerRef.current && footerRef.current.classList.add("revealed");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const filteredProducts =
    activeTab === "all"
      ? featuredProducts
      : featuredProducts.filter((product) => product.category === activeTab);

  return (
    <div className="skincare-hub">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav-bar">
            <div className="logo">
              <svg
                className="crown small"
                viewBox="0 0 24 16"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M1 13c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1-.2 0-.4.1-.6.2L16 9 12 3 8 9 1.6 4.2C1.4 4.1 1.2 4 1 4 0.4 4 0 4.4 0 5v8z" />
              </svg>
              <i className="fas fa-spa"></i>
              <span className="brand-name">Royal Elixir</span>
            </div>
            <nav className="nav">
              <a href="#products">Products</a>
              <a href="#routines">Routines</a>
              <a href="#ingredients">Ingredients</a>
              <a href="#blog">Blog</a>
              <a href="#about">About</a>
            </nav>
            <div className="nav-actions">
              <button className="search-btn">
                <i className="fas fa-search"></i>
              </button>
              <button className="cart-btn">
                <i className="fas fa-shopping-bag"></i>
                <span className="cart-count">0</span>
              </button>
              <button className="account-btn">
                <i className="fas fa-user"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Your Journey to Radiant Skin Starts Here</h1>
            <p>
              Discover personalized skincare solutions, expert advice, and
              premium products tailored to your unique skin needs.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Find Your Routine</button>
              <button className="btn btn-secondary">Shop Products</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">
              <i className="fas fa-spa"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Skin Type Selector */}
      <section className="skin-types">
        <div className="container">
          <h2>Find Products for Your Skin Type</h2>
          <div className="skin-type-grid">
            {skinTypes.map((skin, index) => (
              <div key={index} className="skin-type-card">
                <div className="skin-icon">{skin.icon}</div>
                <h3>{skin.type}</h3>
                <p>{skin.description}</p>
                <button className="btn btn-outline">Explore</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products" id="products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <div className="product-filters">
              {["all", "cleanser", "serum", "moisturizer", "sunscreen"].map(
                (category) => (
                  <button
                    key={category}
                    className={`filter-btn ${
                      activeTab === category ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <div className="placeholder-image">
                    <i className="fas fa-spa"></i>
                  </div>
                  <div className="product-badge">New</div>
                </div>
                <div className="product-info">
                  <span className="product-brand">{product.brand}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <div className="stars">
                      {"★".repeat(Math.floor(product.rating))}
                      <span style={{ opacity: 0.3 }}>
                        {"★".repeat(5 - Math.floor(product.rating))}
                      </span>
                    </div>
                    <span className="rating-value">{product.rating}</span>
                  </div>
                  <div className="product-price">{product.price}</div>
                  <button className="btn btn-primary btn-small">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skincare Routine Builder */}
      <section className="routine-builder" id="routines">
        <div className="container">
          <h2>Build Your Perfect Skincare Routine</h2>
          <p>
            Follow our step-by-step guide to create a routine that works for you
          </p>
          <div className="routine-steps">
            {[
              {
                step: 1,
                title: "Cleanse",
                desc: "Remove impurities and makeup",
              },
              { step: 2, title: "Tone", desc: "Balance skin pH levels" },
              { step: 3, title: "Treat", desc: "Target specific concerns" },
              { step: 4, title: "Moisturize", desc: "Hydrate and protect" },
              { step: 5, title: "Protect", desc: "Shield from sun damage" },
            ].map((step) => (
              <div key={step.step} className="routine-step">
                <div className="step-number">{step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Get Skincare Tips & Exclusive Offers</h2>
            <p>
              Subscribe to our newsletter for expert advice and special
              discounts
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="email-input"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" ref={footerRef}>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <svg
                  className="crown"
                  viewBox="0 0 24 16"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M1 13c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1-.2 0-.4.1-.6.2L16 9 12 3 8 9 1.6 4.2C1.4 4.1 1.2 4 1 4 0.4 4 0 4.4 0 5v8z" />
                </svg>
                <i className="fas fa-spa"></i>
                <span>Skincare Hub</span>
              </div>
              <p>
                Your trusted partner in skincare journey. Quality products,
                expert advice, and personalized routines.
              </p>
              <div className="social-links">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="#">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Shop</h3>
              <ul>
                <li>
                  <a href="#">All Products</a>
                </li>
                <li>
                  <a href="#">New Arrivals</a>
                </li>
                <li>
                  <a href="#">Best Sellers</a>
                </li>
                <li>
                  <a href="#">Skincare Sets</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Help</h3>
              <ul>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Shipping Info</a>
                </li>
                <li>
                  <a href="#">Returns</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Our Story</a>
                </li>
                <li>
                  <a href="#">Sustainability</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; 2024 Skincare Hub. All rights reserved.
            </p>
            <button
              className="back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkincareHub;
