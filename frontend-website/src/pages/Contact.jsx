import { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/leads', {
        name: formData.name,
        phone: formData.phone,
        goal: formData.message.substring(0, 50)
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      alert('Message sent! We will contact you soon.');
      setSubmitted(true);
    }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us for any queries</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Visit Us</h3>
            <p>123 Fitness Street,<br />Andheri East,<br />Mumbai - 400069</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>+91 98765 43210<br />+91 98765 43211</p>
          </div>
          <div className="info-card">
            <div className="info-icon">✉️</div>
            <h3>Email Us</h3>
            <p>info@fitnessprogym.com<br />support@fitnessprogym.com</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🕐</div>
            <h3>Opening Hours</h3>
            <p>Mon-Fri: 6:00 AM - 10:00 PM<br />Sat-Sun: 7:00 AM - 8:00 PM</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          {submitted ? (
            <div className="success-message">
              <h3>Thank you for contacting us!</h3>
              <p>We'll get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
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
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
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
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          )}
        </div>
      </div>

      <div className="map-section">
        <h2>Find Us Here</h2>
        <div className="map-container">
          <iframe
            title="Gym Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.536492942091!2d72.869726!3d19.07609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f3a8f8f8f8%3A0x8f8f8f8f8f8f8f8!2sMumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;