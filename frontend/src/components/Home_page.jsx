import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
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
  const [bestSellingItems, setBestSellingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const images = [
    "/assets/img/image1.png",
    "/assets/img/image2.png",
    "/assets/img/image3.png",
    "/assets/img/image4.png"
  ];

  // Automatic image rotation with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation for hero section
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentImage((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch best-selling items from backend
  useEffect(() => {
    axios.get("https://shyara-gold.onrender.com/best_selling_items", { withCredentials: true })
    .then(response => {
        setBestSellingItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching best-selling items:", error);
        setError("Failed to load items");
        setLoading(false);
      });
  }, []);

  return (
    <div className="store-container">
      <Navbar /> {/* Reusable Navbar */}

      {/* Hero Section with Smooth Transitions */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <img src={images[currentImage]} alt="Hero Image" className="hero-image fade-in" />
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
              aria-label={`Go to ${pages[index].title}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <section className="store-description">
          <div className="image-grid">
            <img src="/assets/img/b1.png" alt="Jewelry piece" loading="lazy" />
            <img src="/assets/img/b2.png" alt="Jewelry piece" loading="lazy" />
          </div>
          <div className="description-content">
            <h2>JEWELLERY STORE</h2>
            <p>Offering collector's choice of traditional and contemporary designs in regional fine appearance.</p>
            <p>We offer a wide range of designs both in gold and silver.</p>
          </div>
        </section>

        {/* Best Selling Items - Improved API Handling */}
        <section className="best-selling">
          <h2>BEST SELLING ITEMS</h2>
          <div className="items-grid">
            {loading ? (
              <p>Loading best-selling items...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              bestSellingItems.map((item, index) => (
                <div key={index} className="item-card">
                  <img src={item.imageUrl} alt={`Best selling item ${index + 1}`} loading="lazy" />
                </div>
              ))
            )}
          </div>
        </section>

        {/* Editorial Section */}
        <section className="editorial">
          <h2>EDITORIAL</h2>
          <div className="editorial-grid">
            {["e1.webp", "e2.webp", "e3.webp", "e4.webp", "e5.webp", "e6.webp", "e7.webp", "e8.webp"].map((img, i) => (
              <div key={i} className="editorial-card">
                <img src={`/assets/img/${img}`} alt={`Editorial image ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Collection */}
        <section className="featured">
          <h2>FEATURED COLLECTION</h2>
          <div className="featured-grid">
            {[
              "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw2e92b445/images/hi-res/501X19FQQAA00_1.jpg?sw=300x300",
              "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw68bbae49/images/hi-res/50D4FFBCKAA02_1.jpg?sw=300x300",
              "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw6affd232/images/hi-res/50D2FFBRUAA09_1.jpg?sw=300x300",
              "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcbdedf41/images/hi-res/50D3FFNKRAA02_1.jpg?sw=300x300",
              "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwea028814/images/Mia/hi-res/3822NTU.jpg?sw=300x300",
              "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw4fb5147a/images/hi-res/50O4M12FJDBA02_1.jpg?sw=300x300"
            ].map((img, i) => (
              <div key={i} className="featured-card">
                <img src={img} alt={`Featured item ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default JewelryStore;
