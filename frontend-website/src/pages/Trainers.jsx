import './Trainers.css';

function Trainers() {
  const trainers = [
    {
      name: 'John Smith',
      role: 'Head Trainer',
      specialization: 'Strength & Conditioning',
      experience: '10+ years',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-4.0.3',
      certifications: 'Certified Personal Trainer (NASM), CrossFit Level 2'
    },
    {
      name: 'Sarah Johnson',
      role: 'Yoga & Wellness Coach',
      specialization: 'Yoga, Flexibility, Meditation',
      experience: '8+ years',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3',
      certifications: 'RYT 500, Yoga Alliance, Pilates Instructor'
    },
    {
      name: 'Mike Chen',
      role: 'Fitness Coach',
      specialization: 'Weight Loss, HIIT, Cardio',
      experience: '7+ years',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3',
      certifications: 'ACE Certified, Nutrition Specialist'
    },
    {
      name: 'Lisa Anderson',
      role: 'Nutrition Expert',
      specialization: 'Diet Planning, Sports Nutrition',
      experience: '6+ years',
      image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-4.0.3',
      certifications: 'Registered Dietitian, Sports Nutritionist'
    }
  ];

  return (
    <div className="trainers-page">
      <div className="page-header">
        <h1>Meet Our Expert Trainers</h1>
        <p>Learn from the best in the industry</p>
      </div>

      <div className="trainers-grid">
        {trainers.map((trainer, index) => (
          <div key={index} className="trainer-card">
            <div className="trainer-image">
              <img src={trainer.image} alt={trainer.name} />
            </div>
            <div className="trainer-info">
              <h2>{trainer.name}</h2>
              <p className="trainer-role">{trainer.role}</p>
              <p className="trainer-specialization">🎯 {trainer.specialization}</p>
              <p className="trainer-experience">⭐ {trainer.experience} Experience</p>
              <p className="trainer-certifications">📜 {trainer.certifications}</p>
              <button className="book-session-btn">Book a Session</button>
            </div>
          </div>
        ))}
      </div>

      <div className="trainer-cta">
        <h2>Ready to Transform Your Body?</h2>
        <p>Get personalized training from our expert coaches</p>
        <a href="/contact" className="cta-button">Start Your Journey →</a>
      </div>
    </div>
  );
}

export default Trainers;