import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Home_page.css";

const About_us = () => {
  return (
    <div>
      <Navbar />
      
      <section className="about-section">
        {/* Background Image */}
        <div className="about-bg"></div>
        
        <div className="about-content">
          {/* About Text */}
          <div className="about-text">
            <h2>"Shyara gold"</h2>
            <p>
              is renowned for having the best gold jewellery. Our exquisite designs are crafted with the
              highest quality gold and precious stones, and are available at fair prices. Our collections offer a wide
              range of choices, so you can find something that speaks to your style and personality.
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="contact-info">
            <p>mo: 93275XXXXX</p>
            <p>mail: Shyaragold@gmail.com</p>
            <ul>
              <li><a href="/help-faqs">Help & FAQs</a></li>
              <li><a href="/about">About Shyara gold</a></li>
              <li><a href="/offers">Offer & Contact details</a></li>
              <li><a href="/stores">Find a store</a></li>
            </ul>
          </div>
          
          {/* Full Width Brand Card (50% opacity) */}
          <div className="brand-card-container">
            <div className="brand-card-full">
              <div className="brand-logo">shyara gold</div>
              <div className="brand-tagline">YOUR STYLE. YOUR STATEMENT.</div>
            </div>
            
            {/* Small Brand Card (100% opacity) - Shows on mobile */}
            <div className="brand-card-small">
              <div className="brand-logo">shyara gold</div>
              <div className="brand-tagline">YOUR STYLE. YOUR STATEMENT.</div>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="social-links">
            <h3>Follow Us :</h3>
            <div className="social-icons">
              <a href="#" className="social-icon youtube"><i className="fab fa-youtube"></i></a>
              <a href="#" className="social-icon facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="thank-you">
            <p>thanks for visit</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About_us;