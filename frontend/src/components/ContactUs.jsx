import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Home_page.css";

const Contact_us = () => {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <section className="contact-section">
          <h1>Contact Us</h1>
          <p>Email: support@shyaragold.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Gold Street, City, Country</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact_us;
