import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home_page from './components/Home_page';
import UsersCollection from './components/Users_Collection';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Collection from './components/Collection';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/users-collection" element={<UsersCollection />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </Router>
  );
}

export default App;
