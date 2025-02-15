import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Home_page.css"; // Make sure this CSS file exists for your home page styling

const About_us = () => {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <section className="about-section">
          <h1>About Us</h1>
          <p>Welcome to Shyara Gold, where timeless beauty meets modern elegance.</p>
          <p>We specialize in handcrafted jewelry that blends traditional craftsmanship with contemporary design.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About_us;
