import { useNavigate } from 'react-router-dom';
import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Collection.css";
import ringVideo from "/assets/video/ringVideo.mov";

const HeroSection = () => (
  <div className="hero-container">
    <video className="hero-video" autoPlay loop muted>
      <source src={ringVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="hero-overlay"></div>
    <div className="hero-content">
      <h1 className="luxury-title">Shyara Gold</h1>
      <p className="luxury-subtitle">Your Style, Your Statement</p>
    </div>      
  </div>
);

const CollectionSection = () => {
  const navigate = useNavigate();

  const collections = [
    { title: 'RINGS', image: '/assets/img/rings.png' },
    { title: 'BENGALS', image: '/assets/img/bengals.png' },
    { title: 'NECKLACES', image: '/assets/img/necklaces.png' },
    { title: 'CHAINS', image: '/assets/img/chains.png' },
    { title: 'MANGALSUTRA', image: '/assets/img/mangalsutra.png' },
    { title: 'EARRINGS', image: '/assets/img/earrings.png' },
    { title: 'BRACELETS', image: '/assets/img/bracelets.png' },
    { title: 'PENDANTS', image: '/assets/img/pendants.png' }
  ];

  return (
    <div className="collection-section">
      <h2 className="bounce-in">COLLECTION</h2>
      <div className="collection-grid">
        {collections.map((item, index) => (
          <div 
            key={index} 
            className="collection-card scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img src={item.image} alt={item.title} />
            <div className="collection-overlay">
              <span className="text-focus-in">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="add-collection-btn pulse" onClick={() => navigate("/users-collection")}>
        Add Collection
      </button>
    </div>
  );
};

const JewelryMainContent = () => (
  <div>
    <Navbar />
    <main className="main-content">
      <HeroSection />
      <CollectionSection />
    </main>
    <Footer />
  </div>
);

export default JewelryMainContent;
