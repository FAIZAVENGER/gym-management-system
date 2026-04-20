import { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import './Members.css';

function Members() {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plan: 'monthly',
    start_date: '',
    end_date: '',
    fee: 1499,
    status: 'active'
  });

  const showNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      showNotification('Failed to fetch members. Make sure backend is running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingMember) {
        await axios.put(`${API_URL}/members/${editingMember.id}`, formData);
        showNotification('✅ Member updated successfully!', 'success');
      } else {
        await axios.post(`${API_URL}/members`, formData);
        showNotification('✅ Member added successfully!', 'success');
      }
      
      setShowForm(false);
      setEditingMember(null);
      setFormData({ 
        name: '', phone: '', email: '', plan: 'monthly', 
        start_date: '', end_date: '', fee: 1499, status: 'active' 
      });
      await fetchMembers();
      
    } catch (error) {
      console.error('Error saving member:', error);
      showNotification('❌ Error saving member. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/members/${id}`);
        showNotification('✅ Member deleted successfully!', 'success');
        await fetchMembers();
      } catch (error) {
        console.error('Error deleting member:', error);
        showNotification('❌ Error deleting member', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const getPlanPrice = (plan) => {
    switch(plan) {
      case 'monthly': return '₹1,499';
      case 'quarterly': return '₹3,999';
      case 'yearly': return '₹12,999';
      default: return '₹1,499';
    }
  };

  const getStatusBadge = (status, endDate) => {
    if (status === 'expired') return <span className="badge expired">Expired</span>;
    const today = new Date();
    const end = new Date(endDate);
    const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3 && daysLeft > 0) return <span className="badge expiring">Expiring Soon</span>;
    if (daysLeft <= 0) return <span className="badge expired">Expired</span>;
    return <span className="badge active">Active</span>;
  };

  return (
    <div className="members-page">
      {showToast && (
        <div className={`toast-notification ${toastType}`}>
          <span>{toastType === 'success' ? '✅' : '❌'}</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="page-header">
        <h1>Member Management</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add New Member</button>
      </div>

      {showForm && (
        <div className="modal" onClick={(e) => {
          if (e.target.className === 'modal') {
            setShowForm(false);
            setEditingMember(null);
          }
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
              <button className="close-modal" onClick={() => { setShowForm(false); setEditingMember(null); }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <select
                value={formData.plan}
                onChange={(e) => {
                  let fee = 1499;
                  if (e.target.value === 'quarterly') fee = 3999;
                  if (e.target.value === 'yearly') fee = 12999;
                  setFormData({...formData, plan: e.target.value, fee: fee});
                }}
              >
                <option value="monthly">Monthly - ₹1,499</option>
                <option value="quarterly">Quarterly - ₹3,999</option>
                <option value="yearly">Yearly - ₹12,999</option>
              </select>
              <input
                type="date"
                placeholder="Start Date"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                required
              />
              <input
                type="date"
                placeholder="End Date"
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                required
              />
              <div className="form-buttons">
                <button type="submit" className="save-btn" disabled={loading}>
                  {loading ? 'Saving...' : (editingMember ? 'Update Member' : 'Save Member')}
                </button>
                <button type="button" className="cancel-btn" onClick={() => { setShowForm(false); setEditingMember(null); }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading && !showForm ? (
        <div className="loading">Loading members...</div>
      ) : (
        <div className="members-table-container">
          <table className="members-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">No members found. Click "Add New Member" to get started.</td>
                </tr>
              ) : (
                members.map(member => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.phone}</td>
                    <td>{getPlanPrice(member.plan)}</td>
                    <td>{member.start_date}</td>
                    <td>{member.end_date}</td>
                    <td>{getStatusBadge(member.status, member.end_date)}</td>
                    <td>
                      <button className="edit-btn" onClick={() => { setEditingMember(member); setFormData(member); setShowForm(true); }}>
                        ✏️ Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(member.id)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Members;