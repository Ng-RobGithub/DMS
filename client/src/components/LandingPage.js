import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../assets/NgRob.png'; // Update the path to your logo file

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">
          <img src={logo} alt="App Logo" className="logo-image" />
        </div>
        <nav>
          <Link to="/about">About Us</Link>
          <Link to="/features">Features</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="login-button">Login</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our Application</h1>
        <p>Your solution for managing orders and distributors efficiently.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-button">Get Started</Link>
          <Link to="/learn-more" className="cta-button">Learn More</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="BlocMaster">
        <h2>Features</h2>
        <div className="feature-item">
          <img src="/images/NgRob1.png" alt="BlocMaster_42.5R"/>
          <h3>Feature 1</h3>
          <p>Description of feature 1.</p>
        </div>
        <div className="feature-item">
          <img src="/images/feature2.png" alt="Feature 2"/>
          <h3>Feature 2</h3>
          <p>Description of feature 2.</p>
        </div>
        {/* Add more features as needed */}
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <h2>Why Choose Us?</h2>
        <p>Learn about the benefits of our application.</p>
        <div className="testimonial">
          <p>"This application has transformed our workflow!" - User</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Step 1: Description of step 1.</li>
          <li>Step 2: Description of step 2.</li>
          <li>Step 3: Description of step 3.</li>
        </ol>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <nav>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </nav>
        <div className="contact-info">
          <p>Contact us at: contact@example.com</p>
          <div className="social-media">
            <a href="https://twitter.com/yourprofile">Twitter</a>
            <a href="https://facebook.com/yourprofile">Facebook</a>
            {/* Add more social media links */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
