import { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';
import './Payments.css';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [formData, setFormData] = useState({
    member_id: '',
    amount: '',
    month: '',
    payment_method: 'cash'
  });

  const showNotification = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    fetchData();
    fetchMembers();
  }, []);

  const fetchData = async () => {
    try {
      const [paymentsRes, pendingRes] = await Promise.all([
        axios.get(`${API_URL}/payments`),
        axios.get(`${API_URL}/payments/pending`)
      ]);
      setPayments(paymentsRes.data);
      setPendingPayments(pendingRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('Error fetching payment data', 'error');
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_URL}/members`);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
      showNotification('Error fetching members', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/payments`, formData);
      showNotification('✅ Payment recorded successfully!', 'success');
      fetchData();
      setShowForm(false);
      setFormData({ member_id: '', amount: '', month: '', payment_method: 'cash' });
    } catch (error) {
      console.error('Error recording payment:', error);
      showNotification('❌ Error recording payment', 'error');
    }
  };

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="payments-page">
      {showToast && (
        <div className={`toast-notification ${toastType}`}>
          <span>{toastType === 'success' ? '✅' : '❌'}</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="page-header">
        <h1>Payment Management</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Record Payment</button>
      </div>

      {pendingPayments.length > 0 && (
        <div className="pending-section">
          <h2>💰 Pending Payments - {currentMonth}</h2>
          <div className="pending-list">
            {pendingPayments.map(payment => (
              <div key={payment.member_id} className="pending-item">
                <div className="pending-info">
                  <strong>{payment.name}</strong>
                  <p>📞 {payment.phone}</p>
                  <p>Amount Due: ₹{payment.fee} - {payment.plan} plan</p>
                </div>
                <div className="pending-actions">
                  <button 
                    className="record-payment-btn"
                    onClick={() => {
                      setFormData({
                        member_id: payment.member_id,
                        amount: payment.fee,
                        month: currentMonth,
                        payment_method: 'cash'
                      });
                      setShowForm(true);
                    }}
                  >
                    💰 Record Payment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal" onClick={(e) => {
          if (e.target.className === 'modal') {
            setShowForm(false);
          }
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Record Payment</h2>
              <button className="close-modal" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <select
                value={formData.member_id}
                onChange={(e) => setFormData({...formData, member_id: e.target.value})}
                required
              >
                <option value="">Select Member</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.phone}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Month (e.g., April 2026)"
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: e.target.value})}
                required
              />
              <select
                value={formData.payment_method}
                onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
              >
                <option value="cash">💵 Cash</option>
                <option value="card">💳 Card</option>
                <option value="upi">📱 UPI</option>
              </select>
              <div className="form-buttons">
                <button type="submit" className="save-btn">💾 Save Payment</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="payments-history">
        <h2>Payment History</h2>
        <div className="payments-table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Amount</th>
                <th>Month</th>
                <th>Payment Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '40px'}}>No payments recorded yet</td>
                </tr>
              ) : (
                payments.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.member_name}</td>
                    <td><strong>₹{payment.amount}</strong></td>
                    <td>{payment.month}</td>
                    <td>{payment.payment_date?.split('T')[0]}</td>
                    <td>
                      <span className="method-badge">
                        {payment.payment_method === 'cash' ? '💵' : payment.payment_method === 'card' ? '💳' : '📱'}
                        {' '}{payment.payment_method.toUpperCase()}
                      </span>
                    </td>
                    <td><span className="status-paid">✓ Paid</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;