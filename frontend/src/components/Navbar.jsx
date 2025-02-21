import { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "/assets/img/logo.png";
import "../style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-container">
          <img src={logo} alt="Shyara Gold Logo" className="logo" />
        </div>

        {/* Search bar (Always Visible) */}
        <div className="search-container">
          <div className="search-icon">
            <Search className="search-icon-svg" />
          </div>
          <input type="search" placeholder="Search" className="search-input" />
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/collection"
              className={location.pathname === "/collection" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Collection
            </Link>
          </li>
          <li>
            <Link
              to="/users-collection"
              className={location.pathname === "/users-collection" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Users Collection
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={28} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
