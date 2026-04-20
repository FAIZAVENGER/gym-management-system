import { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    expiring_soon: 0,
    revenue: 0
  });
  const [expiringMembers, setExpiringMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const showNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, expiringRes] = await Promise.all([
        axios.get(`${API_URL}/stats`),
        axios.get(`${API_URL}/members/expiring-soon`)
      ]);
      setStats(statsRes.data);
      setExpiringMembers(expiringRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('Failed to load dashboard data. Make sure backend is running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async (member) => {
    try {
      await axios.post(`${API_URL}/send-reminder`, {
        phone: member.phone,
        name: member.name,
        end_date: member.end_date
      });
      showNotification(`✅ Reminder sent to ${member.name}!`, 'success');
    } catch (error) {
      showNotification(`❌ Failed to send reminder to ${member.name}`, 'error');
    }
  };

  const statCards = [
    { label: 'Total Members', value: stats.total, icon: '👥', color: '#667eea' },
    { label: 'Active Members', value: stats.active, icon: '💪', color: '#28a745' },
    { label: 'Expired Members', value: stats.expired, icon: '⚠️', color: '#dc3545' },
    { label: 'Expiring Soon', value: stats.expiring_soon, icon: '⏰', color: '#ffc107' },
    { label: 'Monthly Revenue', value: `₹${stats.revenue}`, icon: '💰', color: '#ff6b35' },
  ];

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {showToast && (
        <div className={`toast-notification ${toastType}`}>
          <span>{toastType === 'success' ? '✅' : '❌'}</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <h1>Dashboard Overview</h1>
      
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderBottomColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {expiringMembers.length > 0 && (
        <div className="expiry-alert">
          <h2>⚠️ Memberships Expiring Soon</h2>
          <div className="expiry-list">
            {expiringMembers.map(member => (
              <div key={member.id} className="expiry-item">
                <div>
                  <strong>{member.name}</strong>
                  <p>Expires: {member.end_date}</p>
                </div>
                <button 
                  className="contact-btn"
                  onClick={() => handleSendReminder(member)}
                >
                  Send Reminder
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn" onClick={() => window.location.href='/members'}>
            ➕ Add New Member
          </button>
          <button className="action-btn" onClick={() => window.location.href='/payments'}>
            💰 Record Payment
          </button>
          <button className="action-btn" onClick={() => window.location.href='/attendance'}>
            📅 Mark Attendance
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;