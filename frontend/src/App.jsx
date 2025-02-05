import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home_page from './components/Home_page';
import UsersCollection from './components/UsersCollection';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/users-collection" element={<UsersCollection />} />
        <Route path="/about" element={<h1>About Us Page</h1>} />
        <Route path="/contact" element={<h1>Contact Us Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
