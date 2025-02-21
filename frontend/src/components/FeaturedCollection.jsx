import { useState, useEffect } from "react";
import "../style/FeaturedCollection.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw2e92b445/images/hi-res/501X19FQQAA00_1.jpg?sw=300x300",
  "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw68bbae49/images/hi-res/50D4FFBCKAA02_1.jpg?sw=300x300",
  "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw6affd232/images/hi-res/50D2FFBRUAA09_1.jpg?sw=300x300",
  "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwcbdedf41/images/hi-res/50D3FFNKRAA02_1.jpg?sw=300x300",
  "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwea028814/images/Mia/hi-res/3822NTU.jpg?sw=300x300",
];

export default function FeaturedCollection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="featured">
      <h2>FEATURED COLLECTION</h2>

      {/* Main Feature Image */}
      <div className="featured-main">
        <img src={images[0]} alt="Featured" className="feature-main-img" />
        <div className="feature-text">
          <h2>Timeless Elegance</h2>
          <p>Discover jewelry crafted to perfection.</p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="featured-grid">
        {images.slice(1, 5).map((img, index) => (
          <img key={index} src={img} alt={`Grid ${index + 1}`} className="grid-item" />
        ))}
      </div>

      {/* Carousel Section */}
      <div className="carousel-container">
        <button className="carousel-btn left" onClick={prevSlide}><FaChevronLeft /></button>
        <div className="carousel">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Feature ${index + 1}`}
              className={`carousel-image ${index === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
        <button className="carousel-btn right" onClick={nextSlide}><FaChevronRight /></button>
      </div>
    </section>
  );
}
