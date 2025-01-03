import React, { useState } from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';

import Deso from 'deso-protocol';


const Header: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');


  const connectWallet = async () => {
    try {
      const response = await desoInstance.identity.login();
      const address = response.key;
      setWalletConnected(true);
      setWalletAddress(address);
      console.log('Wallet connected:', address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await desoInstance.identity.logout();
      setWalletConnected(false);
      setWalletAddress(null);
      console.log('Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

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
            <span className="wallet-address">{walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}</span>
          ) : (
            'Connect Wallet'
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
