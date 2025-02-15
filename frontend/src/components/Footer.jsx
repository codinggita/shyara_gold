import "../style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Collection</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-info">
          <h3>Contact Us</h3>
          <p>Email: support@shyaragold.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Gold Street, City, Country</p>
        </div>
      </div>
      <p className="footer-bottom">&copy; 2025 Shyara Gold. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
