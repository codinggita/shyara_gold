import { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "/assets/img/logo.png";
import "../style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-container">
          <img src={logo} alt="Shyara Gold Logo" className="logo" />
        </div>
    
        <div className="search-container">
          <div className="search-icon">
            <Search className="search-icon-svg" />
          </div>
          <input type="search" placeholder="Search" className="search-input" />
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/collection" onClick={closeMenu}>Collection</Link></li>
          <li><Link to="/users-collection" onClick={closeMenu}>Users Collection</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
        </ul>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={28} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;