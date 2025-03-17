import { useState, useEffect, useRef } from "react";
import { Search, Menu, LogIn, LogOut, User, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../components/SearchContext";
import { isAuthenticated, getCurrentUser, logout } from "../utils/auth";
import logo from "/assets/img/logo.png";
import "../style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [user, setUser] = useState(getCurrentUser());

  // Mock data for search results
  const mockProducts = [
    { id: 1, name: "Gold Ring", category: "Rings", path: "/collection/ring" },
    { id: 2, name: "Diamond Necklace", category: "Necklaces", path: "/collection" },
    { id: 3, name: "Silver Bangle", category: "Bangles", path: "/collection/bangles" },
    { id: 4, name: "Gold Earrings", category: "Earrings", path: "/collection" },
    { id: 5, name: "Platinum Band", category: "Rings", path: "/collection/ring" },
  ];

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setUserMenuOpen(false);
        setSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };

    const handleClickOutside = (e) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setSearchFocused(false);
  }, [location.pathname]);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
      setUser(getCurrentUser());
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Filter search results
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.category.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search result click
  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchFocused(false);
    searchInputRef.current?.blur();
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo-container">
          <img src={logo} alt="Shyara Gold Logo" className="logo" />
        </div>

        {/* Search bar */}
        <div className={`search-container ${searchFocused ? 'focused' : ''}`}>
          <div className="search-icon">
            <Search className="search-icon-svg" />
          </div>
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search for products..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setSearchFocused(true)}
          />
          
          {/* Search Results */}
          {searchFocused && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(result => (
                <div 
                  key={result.id} 
                  className="search-result-item"
                  onClick={() => handleSearchResultClick(result.path)}
                >
                  <div className="search-result-name">{result.name}</div>
                  <div className="search-result-category">{result.category}</div>
                </div>
              ))}
            </div>
          )}
          
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
          
          {/* Authentication Links */}
          {authenticated ? (
            <>
              <li className="user-menu-container">
                <button 
                  className="user-menu-button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <User size={20} />
                  <span>{user?.name || 'User'}</span>
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    {user?.role === 'admin' && (
                      <Link to="/admin-dashboard" onClick={() => setUserMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    {user?.role === 'owner' && (
                      <Link to="/owner-dashboard" onClick={() => setUserMenuOpen(false)}>
                        Owner Dashboard
                      </Link>
                    )}
                  </div>
                )}
              </li>
              <li>
                <button onClick={handleLogout} className="logout-nav-button">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn size={16} className="icon-margin" />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={location.pathname === "/signup" ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
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
