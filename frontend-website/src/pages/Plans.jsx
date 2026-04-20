import { Link } from 'react-router-dom';
import FreeTrialForm from '../components/FreeTrialForm';
import './Plans.css';

function Plans() {
  const plans = [
    {
      name: 'Monthly',
      price: '1,499',
      period: 'month',
      features: [
        'Full Gym Access',
        'Basic Training Guidance',
        'Locker Facility',
        'Free WiFi',
        'Changing Rooms'
      ]
    },
    {
      name: 'Quarterly',
      price: '3,999',
      period: '3 months',
      features: [
        'Full Gym Access',
        'Personal Training (2x/week)',
        'Locker + Towel Service',
        'Diet Consultation',
        'Free WiFi',
        'Body Composition Analysis'
      ],
      popular: true
    },
    {
      name: 'Yearly',
      price: '12,999',
      period: 'year',
      features: [
        'Full Gym Access',
        'Unlimited Personal Training',
        'Premium Locker',
        'Custom Diet Plan',
        'Supplement Discounts',
        'Monthly Progress Tracking',
        'Guest Passes (2/month)'
      ]
    }
  ];

  return (
    <div className="plans-page">
      <div className="page-header">
        <h1>Membership Plans</h1>
        <p>Choose the perfect plan that fits your fitness goals</p>
      </div>

      <div className="plans-container">
        {plans.map((plan, index) => (
          <div key={index} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
            {plan.popular && <div className="popular-tag">🔥 Most Popular</div>}
            <h2>{plan.name}</h2>
            <div className="price">
              ₹{plan.price}<span>/{plan.period}</span>
            </div>
            <ul className="features-list">
              {plan.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>
            <Link to="/contact" className="join-btn">Join Now →</Link>
          </div>
        ))}
      </div>

      <div className="trial-banner">
        <div className="trial-banner-content">
          <h2>Not sure which plan to choose?</h2>
          <p>Book a free trial and experience our gym before committing!</p>
          <FreeTrialForm />
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>Can I upgrade my plan later?</h3>
            <p>Yes, you can upgrade your plan anytime. The remaining amount will be adjusted.</p>
          </div>
          <div className="faq-item">
            <h3>Is there a joining fee?</h3>
            <p>No joining fee! Just pay for your chosen plan.</p>
          </div>
          <div className="faq-item">
            <h3>Can I freeze my membership?</h3>
            <p>Yes, you can freeze your membership for up to 30 days (medical/travel reasons).</p>
          </div>
          <div className="faq-item">
            <h3>What are the gym timings?</h3>
            <p>We're open from 6 AM to 10 PM, Monday to Sunday.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plans;