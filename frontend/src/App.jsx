import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home_page from "./components/Home_page";
import UsersCollection from "./components/Users_Collection";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Collection from "./components/Collection";
import Spinner from "./components/Spinner"; // Import Spinner component
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulated loading time
  }, []);

  return (
    <div style={{ opacity: loading ? 1 : 2, transition: "opacity 0.5s ease-in-out" }}>
      <Router>
        {loading && <Spinner />} {/* Show spinner only when loading */}
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="/users-collection" element={<UsersCollection />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
