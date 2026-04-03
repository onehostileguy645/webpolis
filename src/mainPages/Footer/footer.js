// import React from "react";
// import "./footer.css";

// function Footer() {
//     return (
//         <footer className="footer">
//             <div className="footer-content">
//                 <div className="footer-left">
//                     <h3>Logo</h3>
//                     <p>© {new Date().getFullYear()} Все права защищены</p>
//                 </div>

//                 <ul className="footer-links">
//                     <li><a href="/">Home</a></li>
//                     <li><a href="/calc">Insurance</a></li>
//                     <li><a href="/contacts">Contacts</a></li>
//                     <li><a href="/">Права Потребителей</a></li>
//                 </ul>

//                 <div className="footer-right">
//                 </div>
//             </div>
//         </footer>
//     );
// }

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ── LOGO + TAGLINE ── */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <div className="footer-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V12C3 16.97 7 21.5 12 22C17 21.5 21 16.97 21 12V7L12 2Z"
                  fill="white" opacity="0.9"/>
                <path d="M9 12L11 14L15 10" stroke="#0055b3" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="footer-logo-text">ROP<span>GAN</span></span>
          </Link>
          <p className="footer-tagline">
            Compare &amp; save with the best insurance providers. Your trusted partner for all coverage needs.
          </p>
        </div>

        {/* ── NAV LINKS ── */}
        <div className="footer-nav-group">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/calc">Insurance</Link>
          <Link to="/contacts">Contact</Link>
        </div>

        {/* ── INSURANCE TYPES ── */}
        <div className="footer-nav-group">
          <h4>Insurance Types</h4>
          <Link to="/calc">OSAGO</Link>
          <Link to="/calc">KASKO</Link>
        </div>

        {/* ── CONTACT ── */}
        <div className="footer-nav-group">
          <h4>Contact Us</h4>
          <a href="tel:1234567890">📞 123-456-7890</a>
          <a href="mailto:info@ropgan.com">✉️ info@ropgan.com</a>
          <Link to="/contacts">Send a Message</Link>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} ROPGAN. All rights reserved.</p>

          <div className="footer-socials">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>

          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <span>·</span>
            <a href="/terms">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}