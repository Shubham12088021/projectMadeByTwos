import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaBriefcase
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        {/* BRAND */}
        <div className="footer-col">
          <h3 className="footer-brand">MyStore</h3>
          <p className="footer-text">
            Premium footwear & fashion for men, women and kids.
            Designed for comfort, crafted for style.
          </p>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="footer-social"
          >
            <FaInstagram /> @mystore
          </a>
        </div>

        {/* GET IN TOUCH */}
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <ul>
            <li>
              <FaWhatsapp className="footer-icon" />
              WhatsApp: +91 98765 43210
            </li>
            <li>
              <FaPhoneAlt className="footer-icon" />
              Call Support
            </li>
            <li>
              <FaEnvelope className="footer-icon" />
              support@mystore.com
            </li>
            <li>
              <FaBriefcase className="footer-icon" />
              <Link to="#">Careers</Link>
            </li>
          </ul>
        </div>

        {/* NEED HELP */}
        <div className="footer-col">
          <h4>Need Help?</h4>
          <ul>
            <li><Link to="#">Order Tracking</Link></li>
            <li><Link to="#">Exchange Portal</Link></li>
            <li><Link to="#">Shipping & Delivery</Link></li>
            <li><Link to="#">International Delivery</Link></li>
          </ul>
        </div>

        {/* THE STUDIO */}
        <div className="footer-col">
          <h4>The Studio</h4>
          <ul>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="#">More</Link></li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
