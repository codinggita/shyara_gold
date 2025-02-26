import React, { useState, useEffect } from "react";
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./components/SearchContext";
import Home_page from "./components/Home_page";
import UsersCollection from "./components/Users_Collection";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Collection from "./components/Collection";
import Spinner from "./components/Spinner";
import RingsSection from "./components/RingsSection";
import Breadcrumb from "./components/Breadcrumbs";
import BanglesPage from "./components/BanglesPage";
import Navbar from "./components/Navbar";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Ensures page scrolls to top on route change
  }, [pathname]);

  return null; // This component doesn't render anything
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulated loading time
  }, []);

  return (
    <SearchProvider>
      <Router>
        {loading ? ( 
          <Spinner /> 
        ) : ( 
          <div style={{ opacity: 1, transition: "opacity 0.5s ease-in-out" }}>
            <ScrollToTop /> {/* ✅ Ensures scrolling to top on navigation */}
            <Navbar />
            <Routes>
              <Route path="/" element={<Home_page />} />
              <Route path="/users-collection" element={<UsersCollection />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/collection" element={<><Breadcrumb /><Collection /></>} />
              <Route path="/collection/ring" element={<><Breadcrumb /><RingsSection /></>} />
              <Route path="/collection/bangles" element={<BanglesPage />} />
            </Routes>
          </div>
        )}
      </Router>
    </SearchProvider>
  );
}

export default App;
