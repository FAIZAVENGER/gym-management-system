import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About Fitness Pro Gym</h1>
        <p>Your journey to a healthier life starts here</p>
      </div>

      <div className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>Founded in 2015, Fitness Pro Gym has been dedicated to helping individuals achieve their fitness goals in a supportive and motivating environment. What started as a small local gym has now grown into a premier fitness destination with state-of-the-art equipment and expert trainers.</p>
              <p>Our mission is to provide a welcoming space where people of all fitness levels can work towards their goals, whether it's weight loss, muscle gain, or overall wellness. We believe that fitness is not just about looking good – it's about feeling strong, confident, and healthy.</p>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&w=500&h=400&fit=crop" alt="Gym interior" />
            </div>
          </div>
        </div>
      </div>

      <div className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To empower individuals to lead healthier lives through fitness, education, and community support. We strive to make quality fitness accessible to everyone.</p>
            </div>
            <div className="mv-card">
              <div className="mv-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To become the most trusted fitness brand that transforms lives and creates a healthier, happier community one person at a time.</p>
            </div>
            <div className="mv-card">
              <div className="mv-icon">💎</div>
              <h3>Our Values</h3>
              <p>Integrity, Excellence, Community, Innovation, and Results. These values guide everything we do at Fitness Pro Gym.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Members</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Expert Trainers</div>
            </div>
            <div className="stat">
              <div className="stat-number">8+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat">
              <div className="stat-number">200+</div>
              <div className="stat-label">Classes Monthly</div>
            </div>
          </div>
        </div>
      </div>

      <div className="why-choose-us">
        <div className="container">
          <h2>Why Choose Fitness Pro Gym?</h2>
          <div className="reasons-grid">
            <div className="reason">
              <div className="reason-icon">🏋️</div>
              <h3>Modern Equipment</h3>
              <p>Latest machines and free weights from top brands</p>
            </div>
            <div className="reason">
              <div className="reason-icon">👨‍🏫</div>
              <h3>Expert Guidance</h3>
              <p>Certified trainers to guide you every step of the way</p>
            </div>
            <div className="reason">
              <div className="reason-icon">🧘</div>
              <h3>Diverse Classes</h3>
              <p>Yoga, Zumba, CrossFit, HIIT, and more</p>
            </div>
            <div className="reason">
              <div className="reason-icon">🕐</div>
              <h3>Flexible Hours</h3>
              <p>Open early morning to late night for your convenience</p>
            </div>
            <div className="reason">
              <div className="reason-icon">🤝</div>
              <h3>Community</h3>
              <p>Be part of a supportive fitness community</p>
            </div>
            <div className="reason">
              <div className="reason-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Regular assessments and progress reports</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2>Ready to Begin Your Transformation?</h2>
        <p>Join Fitness Pro Gym today and start your fitness journey!</p>
        <a href="/plans" className="cta-button">Join Now →</a>
      </div>
    </div>
  );
}

export default About;