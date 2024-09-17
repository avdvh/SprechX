import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <img src="/assets/logo.png" className="homepage-logo" alt="SprechX Logo" />
        <h1>Welcome to SprechX</h1>
        <p>Your platform for free and secure expression.</p>
        <p>Connect your wallet to start sharing your thoughts without fear of suppression.</p>
        <button className="connect-wallet-button">Connect Wallet</button>
      </header>
      <section className="homepage-content">
        <img src="/assets/hero-background.jpg" className="homepage-background" alt="Background" />
        <div className="homepage-overlay">
          <h2>Share Your Opinions Freely</h2>
          <p>At SprechX, we believe in the power of free speech and secure expression. Our platform ensures that your thoughts and opinions are safe and free from manipulation.</p>
        </div>
      </section>
      <footer className="homepage-footer">
        <p>&copy; 2024 SprechX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
