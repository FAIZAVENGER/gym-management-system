import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Fitness Pro Gym</h3>
          <p>Transform your body, transform your life.</p>
          <p>📍 123 Fitness Street, Your City</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@fitnessprogym.com</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/plans">Membership Plans</a></li>
            <li><a href="/trainers">Trainers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 6:00 AM - 10:00 PM</p>
          <p>Saturday: 7:00 AM - 8:00 PM</p>
          <p>Sunday: 8:00 AM - 6:00 PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Fitness Pro Gym. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;