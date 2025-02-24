import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../style/Users_Collection.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_URL = "https://shyara-gold.onrender.com/users_design_data";

const UsersCollection = () => {
  const [designs, setDesigns] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    material: '',
    style: '',
    goldType: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch designs');
      }
      const data = await response.json();
      setDesigns(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Only JPG, PNG, and WEBP images are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
      if (selectedFile) formDataToSend.append('image', selectedFile);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Failed to submit design');

      setFormData({ name: '', email: '', mobile: '', material: '', style: '', goldType: '' });
      setSelectedFile(null);
      setPreviewUrl('');
      setSuccessMessage('Design submitted successfully!');
      fetchDesigns();
    } catch (error) {
      setError('Failed to submit design. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-collection-container">
      <Navbar />
      <div className="breadcrumb">Home &gt; <span className="highlight">Collection</span></div>
      <h1 className="title">Customers Design</h1>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : designs.length > 0 ? (
        <div className="grid-container">
          {designs.map((design) => (
            <div key={design._id} className="design-card">
              <img
                src={design.imageUrl ? `https://shyara-gold.onrender.com/${design.imageUrl}` : "/placeholder.jpg"}
                alt={`Design by ${design.name}`}
                className="design-image"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-designs">No designs available</p>
      )}

      <h2 className="form-heading">Add Your Design</h2>
      <div className="form-wrapper">
        <h3 className="form-subtitle">Details</h3>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="design-form">
          {Object.keys(formData).map((key) => (
            <div key={key} className="form-group">
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                placeholder={`Enter ${key}`}
                className="input-field"
                required
              />
            </div>
          ))}

          <div className="form-group">
            <input type="file" onChange={handleFileChange} accept="image/jpeg, image/png, image/webp" required />
            {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" />}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UsersCollection;
