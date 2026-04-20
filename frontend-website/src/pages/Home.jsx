import { Link } from 'react-router-dom';
import FreeTrialForm from '../components/FreeTrialForm';
import './Home.css';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Body, <span>Transform Your Life</span></h1>
          <p>Join Fitness Pro Gym and start your fitness journey today with expert trainers and state-of-the-art equipment.</p>
          <div className="hero-buttons">
            <Link to="/plans" className="btn btn-primary">Join Now</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏋️</div>
              <h3>Modern Equipment</h3>
              <p>Latest fitness equipment from top brands</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Expert Trainers</h3>
              <p>Certified trainers with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💪</div>
              <h3>Personalized Plans</h3>
              <p>Custom workout plans for your goals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🕐</div>
              <h3>Flexible Hours</h3>
              <p>Open early morning to late night</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="pricing-preview">
        <div className="container">
          <h2 className="section-title">Membership Plans</h2>
          <div className="preview-cards">
            <div className="price-card">
              <h3>Monthly</h3>
              <div className="price">₹1,499<span>/month</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Basic Training</li>
                <li>✓ Locker Facility</li>
              </ul>
              <Link to="/plans" className="btn">Select Plan</Link>
            </div>
            <div className="price-card popular">
              <div className="popular-badge">Most Popular</div>
              <h3>Quarterly</h3>
              <div className="price">₹3,999<span>/3 months</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Personal Training (2x/week)</li>
                <li>✓ Locker + Towel</li>
                <li>✓ Diet Consultation</li>
              </ul>
              <Link to="/plans" className="btn">Select Plan</Link>
            </div>
            <div className="price-card">
              <h3>Yearly</h3>
              <div className="price">₹12,999<span>/year</span></div>
              <ul>
                <li>✓ Full Gym Access</li>
                <li>✓ Unlimited Personal Training</li>
                <li>✓ Premium Locker</li>
                <li>✓ Diet Plan + Supplements</li>
              </ul>
              <Link to="/plans" className="btn">Select Plan</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Members Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Best gym in town! The trainers are very supportive and helped me lose 15 kgs in 3 months."</p>
              <h4>- Rahul Sharma</h4>
            </div>
            <div className="testimonial-card">
              <p>"Amazing atmosphere and top-notch equipment. Highly recommend to everyone!"</p>
              <h4>- Priya Patel</h4>
            </div>
            <div className="testimonial-card">
              <p>"Joined 6 months ago and I'm in the best shape of my life. Thank you Fitness Pro!"</p>
              <h4>- Amit Kumar</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial CTA */}
      <section className="trial-section">
        <div className="container">
          <div className="trial-wrapper">
            <div className="trial-text">
              <h2>Ready to Start Your Journey?</h2>
              <p>Get 3 days FREE trial. No commitment required!</p>
              <div className="call-buttons">
                <a href="tel:+919876543210" className="btn-call">📞 Call Now</a>
                <Link to="/plans" className="btn-join">Join Now →</Link>
              </div>
            </div>
            <FreeTrialForm />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;