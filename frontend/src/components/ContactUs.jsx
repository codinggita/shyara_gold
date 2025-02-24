import React from 'react';
import { Phone, Mail, MapPin, Clock, Crown } from 'lucide-react';
import '../style/ContactUs.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <>
    <Navbar />
    <div className="container">
      {/* Contact Us Section */}
      <section className="contact-section">
        <h2 className="contact-title">
          Contact <span>Shyara Gold</span>
        </h2>
        <p className="contact-content">
          We're here to help and answer any questions you might have. We look forward to hearing from you.
        </p>
        <blockquote className="contact-quote">
          "Your satisfaction is our priority"
        </blockquote>
      </section>

      {/* Contact Information Grid */}
      <section className="contact-info-section">
        <h3 className="contact-info-title">
          Reach <span>Shyara Gold</span>
        </h3>
        <div className="contact-info-grid">
          <div>
            <p className="contact-info-text">
              Visit our store to explore our exclusive collection of fine jewelry. Our expert staff is ready to assist you
              in finding the perfect piece that matches your style and occasion.
            </p>
            <ul className="contact-list">
              <li className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <strong>Phone</strong>
                  <p>93275XXXXX</p>
                </div>
              </li>
              <li className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <strong>Email</strong>
                  <p>Shyaragold@gmail.com</p>
                </div>
              </li>
              <li className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <strong>Location</strong>
                  <p>123 Jewelry Lane, Diamond District</p>
                </div>
              </li>
              <li className="contact-item">
                <Clock className="contact-icon" />
                <div>
                  <strong>Business Hours</strong>
                  <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="logo-container">
          <div className="logo-container">
            <div className="logo-circle">
              <img src="/assets/img/about_logo.png" alt="Shyara Gold Logo" className="logo-image" />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Store Information Section */}
      <section className="store-info">
        <h1 className="store-info-title">
          Visit Our <span>Store</span>
        </h1>
        
        <p className="store-info-content">
          Experience the luxury of Shyara Gold in person. Our showroom features an extensive collection
          of fine jewelry, from classic designs to contemporary masterpieces.
        </p>
        
        <p className="store-info-content">
          Our experienced staff is ready to assist you in finding the perfect piece that matches your style
          and occasion. We offer personalized consultation services to ensure your complete satisfaction.
        </p>
        
        <div className="quote-container">
          <h2 className="customer-service-quote">
            "Every customer is precious to us, just like our jewels"
          </h2>
        </div>
        
        <p className="store-info-content">
          We take pride in providing exceptional customer service and ensuring that every visit to
          Shyara Gold is memorable and worthwhile.
        </p>
      </section>
      
      {/* Background Pattern */}
      <div className="background-pattern"></div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;