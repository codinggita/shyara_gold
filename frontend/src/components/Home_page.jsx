import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import Navbar from "./Navbar"; // Reusable Navbar Component
import Footer from "./Footer";
import "../style/Home_page.css";

const pages = [
  { id: 1, title: "Modern Elegance", subtitle: "Discover our latest collection" },
  { id: 2, title: "Timeless Beauty", subtitle: "Handcrafted with passion" },
  { id: 3, title: "Royal Collection", subtitle: "For those who deserve the best" },
  { id: 4, title: "Wedding Series", subtitle: "Make your special day perfect" }
];

const JewelryStore = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/assets/img/image1.png",
    "/assets/img/image2.png",
    "/assets/img/image3.png",
    "/assets/img/image4.png"
  ];

  const [bestSellingItems, setBestSellingItems] = useState([]);
  const [editorialItems, setEditorialItems] = useState([]);
  const [featuredCollection, setFeaturedCollection] = useState([]);

  // Fetch Best Selling Items from Backend
  useEffect(() => {
    axios.get("https://shyara-gold.onrender.com/best_selling_items")
      .then((response) => {
        setBestSellingItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching best-selling items:", error);
      });

    // Fetch Editorial Content (Placeholder: Replace with actual API if available)
    axios.get("https://shyara-gold.onrender.com/editorial") // Replace with correct API endpoint
      .then((response) => {
        setEditorialItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching editorial content:", error);
      });

    // Fetch Featured Collection (Placeholder: Replace with actual API if available)
    axios.get("https://shyara-gold.onrender.com/featured") // Replace with correct API endpoint
      .then((response) => {
        setFeaturedCollection(response.data);
      })
      .catch((error) => {
        console.error("Error fetching featured collection:", error);
      });
  }, []);

  // Hero Section Image Slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="store-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <img src={images[currentImage]} alt="Hero Image" className="hero-image" />
        <div className="hero-content">
          <h1>{pages[currentImage].title}</h1>
          <p>{pages[currentImage].subtitle}</p>
        </div>
        <div className="page-indicators">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`indicator ${currentImage === index ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Store Description */}
        <section className="store-description">
          <div className="image-grid">
            <img src="/assets/img/b1.png" alt="Jewelry piece" />
            <img src="/assets/img/b2.png" alt="Jewelry piece" />
          </div>
          <div className="description-content">
            <h2>JEWELLERY STORE</h2>
            <p>Offering collector's choice of traditional and contemporary designs in regional fine appearance.</p>
            <p>We offer a wide range of designs both in gold and silver.</p>
          </div>
        </section>

        {/* Best Selling Items */}
        <section className="best-selling">
          <h2>BEST SELLING ITEMS</h2>
          <div className="items-grid">
            {bestSellingItems.length > 0 ? (
              bestSellingItems.map((item, i) => (
                <div key={i} className="item-card">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))
            ) : (
              <p>Loading items...</p>
            )}
          </div>
        </section>

        {/* Editorial Section */}
        <section className="editorial">
          <h2>EDITORIAL</h2>
          <div className="editorial-grid">
            {editorialItems.length > 0 ? (
              editorialItems.map((item, i) => (
                <div key={i} className="editorial-card">
                  <img src={item.image} alt={`Editorial image ${i + 1}`} />
                </div>
              ))
            ) : (
              <p>Loading editorial content...</p>
            )}
          </div>
        </section>

        {/* Featured Collection */}
        <section className="featured">
          <h2>FEATURED COLLECTION</h2>
          <div className="featured-grid">
            {featuredCollection.length > 0 ? (
              featuredCollection.map((item, i) => (
                <div key={i} className="featured-card">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))
            ) : (
              <p>Loading featured collection...</p>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default JewelryStore;
