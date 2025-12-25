import React from "react";
import "./footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h3>Logo</h3>
                    <p>© {new Date().getFullYear()} Все права защищены</p>
                </div>

                <ul className="footer-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/calc">Insurance</a></li>
                    <li><a href="/contacts">Contacts</a></li>
                    <li><a href="/">Права Потребителей</a></li>
                </ul>

                <div className="footer-right">
                </div>
            </div>
        </footer>
    );
}

export default Footer;
