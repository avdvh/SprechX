import React from 'react';
import './RightSidebar.css'; // Create a CSS file for styling the RightSidebar component

const RightSidebar: React.FC = () => {
  return (
    <aside className="homepage-trending">
      <h2>Trending</h2>
      <ul>
        <li>Trending Topic 1</li>
        <li>Trending Topic 2</li>
        <li>Trending Topic 3</li>
        {/* Add more trending topics as needed */}
      </ul>
    </aside>
  );
};

export default RightSidebar;
