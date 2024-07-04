// This is the health admin header page
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/logo.jpg"

function HealthAdminHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <img className="logo" src={image}></img>
      <nav className={showMenu ? 'nav active' : 'nav'}>
      <Link to="/" className="nav-link">Home</Link>
        <Link to="/healthadmin" className="nav-link">Dashboard</Link>
        <Link to="/sign-in" className="nav-link">Logout</Link>
      </nav>
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
    </header>
  );
}

export default HealthAdminHeader;
