import { Link } from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-about">
          <h3>Evans<span className="accent">Hills</span> Recruitment</h3>
          <p>Connecting Zimbabwe’s talent to global opportunities.</p>
          <p>Harare, Zimbabwe | +263 123 456 789</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/job-seekers">Job Seekers</Link></li>
            <li><Link to="/employers">Employers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        <div className="footer-services">
          <h4>Services</h4>
          <ul>
            <li>Healthcare Recruitment</li>
            <li>Logistics Staffing</li>
            <li>Domestic Support</li>
            <li>Visa & Interview Prep</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 EvansHills Recruitment. All rights reserved.
      </div>
    </footer>
  )
}
