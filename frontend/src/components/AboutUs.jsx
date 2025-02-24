import React from "react";
import "../style/AboutUs.css"; // Ensure your CSS file is correctly linked
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar /> {/* Include the Navbar at the top */}
      <div className="container">
        {/* About Us Section */}
        <section className="about-section">
          <h2 className="about-title">
            About <span>Shyara Gold</span>
          </h2>
          <p className="about-content">
            Welcome to Shyara Gold, where timeless elegance meets modern craftsmanship. 
            We specialize in exquisite jewelry collections, designed to elevate your style and 
            reflect your unique personality.
          </p>
          <blockquote className="about-quote">
            "Your Style, Your Statement."
          </blockquote>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-section">
          <h3 className="why-choose-title">
            Why Choose <span>Shyara Gold?</span>
          </h3>
          <div className="why-choose-grid">
            <div>
              <p className="why-choose-text">
                We employ a cutting-edge production facility that elevates jewellery manufacture to new artistic heights,
                ensuring that even our smallest designs are made with the utmost care. 
                Our designs blend classic elegance with contemporary aesthetics. 
                At Shyara Gold, we offer premium-quality, handcrafted jewelry with unique designs and timeless beauty.
              </p>
              <ul className="features-list">
                <li className="feature-item">
                  <span className="feature-dot"></span> Pure Gold & Certified Diamonds
                </li>
                <li className="feature-item">
                  <span className="feature-dot"></span> Custom Design Options
                </li>
                <li className="feature-item">
                  <span className="feature-dot"></span> Affordable Luxury
                </li>
                <li className="feature-item">
                  <span className="feature-dot"></span> Secure & Fast Delivery
                </li>
              </ul>
            </div>
            <div className="logo-container">
              <div className="logo-circle">
                <img
                  src="/assets/img/about_logo.png"
                  alt="Shyara Gold Logo"
                  className="logo-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Us Story Section */}
        <section className="about-story">
          <h1 className="about-story-title">
            About <span>Shyara Gold</span>
          </h1>
          
          <p className="about-story-content">
            Every piece of jewelry tells a story, and Shyara Gold crafts beautiful tales to be cherished! 
            For over 25 years, we have built a brand synonymous with superior quality, unique designs, and fair pricing.  
          </p>
          
          <p className="about-story-content">
            Our commitment to excellence ensures the finest craftsmanship and reliability in every purchase. 
            We strive to exceed customer expectations with every creation.
          </p>
          
          <div className="quote-container">
            <h2 className="customer-loyalty-quote">
              "Our Loyalty to customers is priceless just like our jewels."
            </h2>
          </div>
          
          <p className="about-story-content">
            With years of experience and thousands of happy customers, we are proud to be one of Surat’s most trusted jewelry brands.
          </p>
        </section>
        
        {/* Background Pattern */}
        <div className="background-pattern"></div>
      </div>
      
      <Footer /> {/* Include the Footer at the bottom */}
    </>
  );
};

export default AboutUs;

