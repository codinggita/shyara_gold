import React from "react";
import "../style/ContactUs.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contact Us</h2>
      </div>
      <div className="contact-info">
        <p><strong>Phone:</strong> 93275XXXXX</p>
        <p><strong>Email:</strong> Shyaragold@gmail.com</p>
        <ul>
          <li><a href="#">Help & FAQs</a></li>
          <li><a href="#">About Shyara Gold</a></li>
          <li><a href="#">Offer & Contact Details</a></li>
          <li><a href="#">Find a Store</a></li>
        </ul>
      </div>
      <div className="contact-description">
        <p>
          <strong>Shyara Gold</strong> is renowned for having the best gold jewellery. Our exquisite
          designs are crafted with the highest quality gold and precious stones, available at fair prices.
        </p>
      </div>
      <div className="social-icons">
        <p>Follow Us:</p>
        <a href="#" className="icon"><FaYoutube /></a>
        <a href="#" className="icon"><FaFacebookF /></a>
        <a href="#" className="icon"><FaInstagram /></a>
      </div>
      <div className="contact-footer">
        <p>Thanks for visiting</p>
        <div className="branding">Shyara Gold</div>
        <span>Your Style. Your Statement.</span>
      </div>
    </div>
  );
};

export default ContactUs;