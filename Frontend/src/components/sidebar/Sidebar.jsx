import React, { useState } from 'react';
import "./Sidebar.scss";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '>' : '<'}
      </button>
      <div className="content">
        <h2>AI Assistant</h2>
        <p>Coming Soon...</p>
        {/* المفروض الشات هيبقي هنا ي زياااا  */}
      </div>
    </div>
  );
};

export default Sidebar;
