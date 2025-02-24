import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Users_Collection.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_URL = "https://shyara-gold.onrender.com/users_design_data";

const UsersCollection = () => {
  const [designs, setDesigns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch designs");
      const data = await res.json();
      setDesigns(data);
    } catch (err) {
      console.error("Error fetching data:", err);
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
        setSelectedFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () => {
    return formData.name.trim() !== "" && formData.email.trim() !== "" && selectedFile !== null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("image", selectedFile);

      console.log("FormData before sending:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit design");
      }

      setFormData({ name: "", email: "" });
      setSelectedFile(null);
      setPreviewUrl("");
      setSuccessMessage("Design submitted successfully!");
      fetchDesigns();
    } catch (error) {
      setError(error.message || "Failed to submit design. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-collection-container">
      <Navbar />
      <div className="breadcrumb">
        Home &gt; <span className="highlight">Collection</span>
      </div>
      <h1 className="title">Customers Design</h1>

      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : designs.length > 0 ? (
        <div className="grid-container">
          {designs.map((design) => (
            <div key={design._id} className="design-card">
              <img
                src={design.imageUrl || "/placeholder.jpg"}
                alt={`Design by ${design.name}`}
                className="design-image"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="no-designs">
          No designs available. <br />
          <span className="cta">Be the first to submit your design!</span>
        </p>
      )}

      <h2 className="form-heading">Add Your Design</h2>
      <div className="form-wrapper">
        <h3 className="form-subtitle">Details</h3>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="design-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/webp"
            />
            {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" />}
          </div>

          <button type="submit" className="submit-btn" disabled={loading || !isFormValid()}>
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UsersCollection;
