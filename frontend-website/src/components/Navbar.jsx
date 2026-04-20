import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          💪 <span>Fitness Pro Gym</span>
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/plans">Membership</Link></li>
          <li><Link to="/trainers">Trainers</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <Link to="/plans" className="nav-cta">Join Now</Link>
      </div>
    </nav>
  );
}

export default Navbar;