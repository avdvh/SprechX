import React from 'react';
import { Link } from 'react-router-dom';
import './LeftSidebar.css';
import { FaHome, FaBell, FaCompass, FaEnvelope, FaUser, FaEllipsisH } from 'react-icons/fa';

const LeftSidebar: React.FC = () => {
  return (
    <aside className="homepage-sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/" className="nav-button"><FaHome /> Home</Link></li>
          <li><button className="nav-button"><FaBell /> Notifications</button></li>
          <li><button className="nav-button"><FaCompass /> Discover</button></li>
          <li><button className="nav-button"><FaEnvelope /> Messages</button></li>
          <li><Link to="/profile" className="nav-button"><FaUser /> Profile</Link></li>
          <li><button className="nav-button"><FaEllipsisH /> More</button></li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftSidebar;
