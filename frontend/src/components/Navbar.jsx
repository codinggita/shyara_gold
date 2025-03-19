import { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../components/SearchContext"; // Import Search Context
import logo from "/assets/img/logo.png";
import "../style/Navbar.css";
import { UserProfileStorageGetter } from "../utils/LocalStorageEncryption";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch(); // Get global search state
  const [usertype, setusertype] = useState("user")

  // Close menu when Escape key is pressed
  useEffect(() => {
    (async () => {
      try {
        const userDataRaw = await UserProfileStorageGetter('user_credentials_config');
        console.log("Retrieved User Data:", userDataRaw); // Debugging
        
        if (!userDataRaw || !userDataRaw.data) {
          console.warn("User data is missing or undefined.");
          return;
        }
  
        const parsedData = JSON.parse(userDataRaw.data); // Ensure it's valid JSON
        if (parsedData && parsedData.role) {
          setusertype(parsedData.role);
        } else {
          console.warn("Invalid or incomplete user data.");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    })();
  
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

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query globally
    navigate("collection/ring"); // Redirect to Rings Collection Page
  };

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
          <input
            type="search"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
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
          {
            usertype === "admin" && (
              <li>
                <Link
                  to="/admin/"
                  className={location.pathname === "/admin/dashboard" ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </li>
            )
          }
          
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
