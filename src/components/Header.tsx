import React, { useState } from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import * as Deso from 'deso-protocol';  // Import the module

const Header: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle wallet connection
  const connectWallet = async () => {
    try {
      const response = await Deso.identity.login(); // Call login directly on Deso
      console.log('Login response:', response); // Log the response to inspect structure
      
      if (response && response.key) {
        const address = response.key;
        setWalletConnected(true);
        setWalletAddress(address);
        console.log('Wallet connected:', address);
      } else {
        console.error('Response does not contain expected "key" field. Response:', response);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Handle wallet disconnection
  const disconnectWallet = async () => {
    try {
      await Deso.identity.logout(); // Call logout directly on Deso
      setWalletConnected(false);
      setWalletAddress(null);
      console.log('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  // Handle search
  const handleSearch = () => {
    console.log('Search term:', searchTerm);
  };

  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="header-link">
          <img src="/assets/logo.png" className="header-logo" alt="SprechX Logo" />
          <span className="header-title">SprechX</span>
        </a>
      </div>
      <div className="header-wallet">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search SprechX"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        <button className="wallet-button" onClick={walletConnected ? disconnectWallet : connectWallet}>
          {walletConnected ? (
            <span className="wallet-address">
              {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
            </span>
          ) : (
            'Connect Wallet'
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
