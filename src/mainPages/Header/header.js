// // Header.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './style.css'

// function Header() {
//     const [isLoginned] = useState(0);
//     const navigate = useNavigate();

//     const handleLoginClick = () => {
//         navigate('/login');
//     };

//     return (
//         <div className="topBar">
//             <label>Logo</label>
//             <ul>
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/calc">Insurance</a></li>
//                 <li><a href="/contacts">Contacts</a></li>
//             </ul>
//             {isLoginned === 0 && (  
//                 <>              
//                 <button onClick={handleLoginClick}>Login</button>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Header;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-inner">

        {/* ── LOGO ── */}
        <Link to="/" className="header-logo">
          <div className="header-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 16.97 7 21.5 12 22C17 21.5 21 16.97 21 12V7L12 2Z"
                fill="white" opacity="0.9"/>
              <path d="M9 12L11 14L15 10" stroke="#0055b3" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="header-logo-text">ROP<span>GAN</span></span>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav className="header-nav">
          <Link to="/"        className={isActive("/")        ? "nav-link active" : "nav-link"}>Home</Link>
          <Link to="/calc"    className={isActive("/calc")    ? "nav-link active" : "nav-link"}>Insurance</Link>
          <Link to="/contacts"className={isActive("/contacts")? "nav-link active" : "nav-link"}>Contact</Link>
        </nav>

        {/* ── CTA BUTTON ── */}
        <div className="header-actions">
          <Link to="/calc"  className="header-btn-green">Get a Quote</Link>
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          className={`header-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="header-mobile-menu">
          <Link to="/"         onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about"    onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/calc"     onClick={() => setMenuOpen(false)}>Insurance</Link>
          <Link to="/contacts" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/calc"     onClick={() => setMenuOpen(false)} className="mobile-quote">Get a Quote</Link>
        </div>
      )}
    </header>
  );
}