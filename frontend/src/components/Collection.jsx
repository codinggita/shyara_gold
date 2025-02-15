import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Collection.css";
import ringVideo from "/assets/video/ringVideo.mov";

const HeroSection = () => {
  return (
    <div>
      <Navbar/>
      <div className="hero-container">
        <div className="video-section">
          <video autoPlay muted loop className="hero-video">
            <source src={ringVideo} type="video/mp4" />
            {/* If video fails to load, show this background */}
            <div className="video-fallback"></div>
          </video>
        </div>
        
        <div className="hero-text">
          <div className="animated-title">
            <h1 style={{ fontFamily: 'Mea Culpa, cursive' }}>
              {'Shyara Gold'.split('').map((letter, index) => (
                <span 
                  key={index} 
                  className="animated-letter"
                  style={{ '--i': index }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            <p className="subtitle">Elegance in Every Detail</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedSection = () => (
  <div className="featured-container">
    <div className="featured-image zoom-in">
      <img 
        src="https://tse3.mm.bing.net/th?id=OIP.u212LfA11ebqafh_hd9F3QHaHa&pid=Api" 
        alt="Featured Collection"
      />
    </div>
    <div className="best-collection">
      <div className="collection-grid">
        {[
          { title: 'Diamond Rings', img: 'https://tse3.mm.bing.net/th?id=OIP.OEye6q3qTQVmkS38oLc23AHaLA&pid=Api' },
          { title: 'Gold Necklaces', img: 'https://tse2.mm.bing.net/th?id=OIP.Yfxx_qdeXekAk_o_VDunDAHaHa&pid=Api' },
          { title: 'Wedding Collection', img: 'https://tse1.mm.bing.net/th?id=OIP.JSD5MWKZl64zO-6x1mlVEQHaHa&pid=Api' },
          { title: 'Designer Earrings', img: 'https://tse3.mm.bing.net/th?id=OIP._OaXbbJf8yshZJYYxR3X2wHaHa&pid=Api' }
        ].map((item, index) => (
          <div 
            key={index} 
            className="collection-item fade-in-delay"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <img src={item.img} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CollectionSection = () => {
  const collections = [
    { title: 'RINGS', image: 'https://tse4.mm.bing.net/th?id=OIP.VH0nKlZZC1tTSeQfr4eXyAHaHa&pid=Api' },
    { title: 'BENGALS', image: 'https://tse1.mm.bing.net/th?id=OIP.pXk6V2psSCBDWQ1PU5MrfAHaHa&pid=Api' },
    { title: 'NECKLACES', image: 'https://tse3.mm.bing.net/th?id=OIP.JkFsgVOe3H8P1F1m57FkxwHaHa&pid=Api' },
    { title: 'CHAINS', image: 'https://tse2.mm.bing.net/th?id=OIP.yO-VH7bCDVCZaxO-1h4uVAHaHa&pid=Api' },
    { title: 'MANGALSUTRA', image: 'https://tse3.mm.bing.net/th?id=OIP.DwGlwKd1wgqyWOFfAZXe-gHaIs&pid=Api' },
    { title: 'EARRINGS', image: 'https://tse2.mm.bing.net/th?id=OIP.NUL_qbUgTz3ePMJQOCj44gHaHa&pid=Api' },
    { title: 'BRACELETS', image: 'https://tse3.mm.bing.net/th?id=OIP.7I9XHpDYTjj1BPZknSxXAwHaHa&pid=Api' },
    { title: 'PENDANTS', image: 'https://tse2.mm.bing.net/th?id=OIP.UchqLZcJ2RrdeYB9C5_NJQHaHa&pid=Api' }
  ];

  return (
    <div className="collection-section">
      <h2 className="bounce-in" style={{ fontFamily: 'Mea Culpa, cursive' }}>COLLECTION</h2>
      <div className="collection-grid">
        {collections.map((item, index) => (
          <div 
            key={index} 
            className="collection-card scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={item.image} alt={item.title} />
            <div className="collection-overlay">
              <span className="text-focus-in" style={{ fontFamily: 'Mea Culpa, cursive' }}>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="add-collection-btn pulse">Add Collection</button>
    </div>
  );
};

const JewelryMainContent = () => (
  <div>
    <main className="main-content">
      <HeroSection />
      <FeaturedSection />
      <CollectionSection />
    </main>
    <Footer />
  </div>
);

export default JewelryMainContent;
