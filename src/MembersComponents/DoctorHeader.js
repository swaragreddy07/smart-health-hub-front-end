// This is the healthcare provider header Page
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/logo.jpg"

function DoctorHeader() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <img className="logo" src={image}></img>
      <nav className={showMenu ? 'nav active' : 'nav'}>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/doctors" className="nav-link">Dashboard</Link>
      <Link to="/sign-in" className="nav-link">Logout</Link>
      </nav>
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
    </header>
  );
}

export default DoctorHeader;
