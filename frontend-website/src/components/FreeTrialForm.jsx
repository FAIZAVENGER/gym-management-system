import { useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import './FreeTrialForm.css';

function FreeTrialForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/leads`, {
        ...formData,
        source: 'website'
      });
      setSubmitted(true);
      setFormData({ name: '', phone: '', goal: '' });
      showNotification('✅ Free trial booked successfully! We will contact you soon.');
    } catch (error) {
      showNotification('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="trial-success">
        <h3>✅ Thank You!</h3>
        <p>We'll contact you within 24 hours to schedule your free trial.</p>
        <button onClick={() => setSubmitted(false)}>Book Another</button>
      </div>
    );
  }

  return (
    <div className="free-trial-form">
      {showToast && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
      <h3>Book Your Free Trial</h3>
      <p>Try our gym for 3 days absolutely FREE!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <select name="goal" value={formData.goal} onChange={handleChange} required>
          <option value="">Select Your Goal</option>
          <option value="weight-loss">Weight Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="fitness">General Fitness</option>
          <option value="strength">Strength Training</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Book Free Trial'}
        </button>
      </form>
      <style jsx>{`
        .toast-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #333;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          z-index: 10000;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default FreeTrialForm;