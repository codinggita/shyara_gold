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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bestSellingRes, editorialRes, featuredRes] = await Promise.all([
          axios.get("https://shyara-gold.onrender.com/best_selling_items"),
          axios.get("https://shyara-gold.onrender.com/editorial"),
          axios.get("https://shyara-gold.onrender.com/featured")
        ]);

        // Debugging: Log the API response
        console.log("Best Selling Items:", bestSellingRes.data);
        console.log("Editorial Items:", editorialRes.data);
        console.log("Featured Collection:", featuredRes.data);

        setBestSellingItems(bestSellingRes.data);
        setEditorialItems(editorialRes.data);
        setFeaturedCollection(featuredRes.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          {loading ? <p>Loading items...</p> : error ? <p className="error">{error}</p> : (
            <div className="items-grid">
              {bestSellingItems.length > 0 ? (
                bestSellingItems.map((item) => (
                  <div key={item._id} className="item-card">
                    <img src={item.imageUrl || "/assets/img/fallback.png"} alt={item.name || "Jewelry Item"} />
                    <p>{item.name || "Unnamed Item"}</p>
                  </div>
                ))
              ) : (
                <p>No items available.</p>
              )}
            </div>
          )}
        </section>

        {/* Editorial Section */}
        <section className="editorial">
          <h2>EDITORIAL</h2>
          <div className="editorial-grid">
            {["e1.webp", "e2.webp", "e3.webp", "e4.webp", "e5.webp", "e6.webp", "e7.webp", "e8.webp"].map((img, i) => (
              <div key={i} className="editorial-card">
                <img src={`/assets/img/${img}`} alt={`Editorial image ${i + 1}`} />
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
                <img src={img} alt={`Featured item ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default JewelryStore;
