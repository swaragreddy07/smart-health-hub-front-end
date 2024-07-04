// This is the header of the website
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/logo.jpg"
function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <img className="logo" src={image}></img>
      <nav className={showMenu ? 'nav active' : 'nav'}>
      <Link to="/" className="nav-link">Home</Link>
        <Link to="/about-us" className="nav-link">About</Link>
        <Link to="/service" className="nav-link">Services</Link>
        <Link to="/contact-us" className="nav-link">Contact</Link>
        <Link to="/sign-up" className="nav-link">Sign Up</Link>
        <Link to="/sign-in" className="nav-link">Sign In</Link>
        <Link to='https://sxp8023.uta.cloud/blog' className='nav-link' target="_blank" rel="noopener noreferrer">Blog</Link>
</nav>
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>
    </header>
  );
}

export default Header;
