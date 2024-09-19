import React, { useState } from 'react';
import './Header.css';
import { FaSearch } from 'react-icons/fa';
import { ethers } from 'ethers';

const Header: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // Request wallet connection
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []); // Trigger MetaMask to connect
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletConnected(true);
        setWalletAddress(address); // Store the connected wallet address
        console.log('Wallet connected:', address);
      } else {
        console.error('MetaMask not detected');
        alert('Please install MetaMask to connect your wallet.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress(null);
    console.log('Wallet disconnected');
  };

  const handleSearch = () => {
    // Handle search logic here
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
          {walletConnected && <span className="disconnect-text">Disconnect Wallet</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;
