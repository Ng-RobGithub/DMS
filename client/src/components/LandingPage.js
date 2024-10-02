import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import logo from '../assets/NgRob1.png'; // Correct path for your logo
import blocmaster from '../assets/blocmaster.png'; // Ensure the image exists
import dan3XN from '../assets/3X-42.5N.png';
import dan3XR from '../assets/3X-42.5R.png';
import Falcon from '../assets/FALCON.png';
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
          <Link to="/login" className="login-button">
            Login
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our Application</h1>
        <p>Your solution for managing orders and distributors efficiently.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-button">
            Get Started
          </Link>
          <Link to="/learn-more" className="cta-button">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <div className="feature-item">
          <img src={blocmaster} alt="BlocMaster 42.5R" className="" />
          <h3>BlocMaster 42.5R</h3>
          <p>For Blocks and concrete</p>
        </div>
        <div className="feature-item">
          <img src={dan3XN} alt="3X-42.5N" className="3X-42.5N" />
          <h3>3X-42.5N</h3>
          <p>Normal setting for multipurpose application</p>
        </div>
        <div className="feature-item">
          <img src={dan3XR} alt="3X-42.5R" className="3X-42.5R" />
          <h3>3X-42.5R</h3>
          <p>Rapid setting for multipurpose application</p>
        </div>
        <div className="feature-item">
          <img src={Falcon} alt="Falcon" className="FALCON" />
          <h3>FALCON</h3>
          <p>Lower grade Rapid setting for multipurpose application</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <h2>Why Choose Us?</h2>
        <p>Learn about the benefits of our application.</p>
        <div className="testimonial">
          <p>
            "This application has transformed our workflow!" - Satisfied User
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Step 1: Register your account and set up your profile.</li>
          <li>Step 2: Manage orders and track distributions easily.</li>
          <li>Step 3: Generate reports and stay on top of your performance.</li>
        </ol>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <nav>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </nav>
        <div className="contact-info">
          <p>Contact us at: ngrob4real@gmail.com</p>
          <div className="social-media">
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
