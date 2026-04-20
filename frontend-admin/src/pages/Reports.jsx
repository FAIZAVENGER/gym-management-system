import { useEffect, useState } from 'react';
import axios from 'axios';
import './Reports.css';

function Reports() {
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [membersRes, paymentsRes] = await Promise.all([
        axios.get('http://localhost:8000/api/members'),
        axios.get('http://localhost:8000/api/payments')
      ]);
      setMembers(membersRes.data);
      setPayments(paymentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0] || {});
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeMembers = members.filter(m => m.status === 'active').length;
  const newThisMonth = members.filter(m => {
    const joinDate = new Date(m.join_date);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="reports-page">
      <h1>Reports & Analytics</h1>

      <div className="report-stats">
        <div className="report-stat-card">
          <h3>Total Revenue</h3>
          <div className="stat-value">₹{totalRevenue}</div>
        </div>
        <div className="report-stat-card">
          <h3>Active Members</h3>
          <div className="stat-value">{activeMembers}</div>
        </div>
        <div className="report-stat-card">
          <h3>New This Month</h3>
          <div className="stat-value">{newThisMonth}</div>
        </div>
        <div className="report-stat-card">
          <h3>Total Members</h3>
          <div className="stat-value">{members.length}</div>
        </div>
      </div>

      <div className="export-section">
        <h2>Export Reports</h2>
        <div className="export-buttons">
          <button onClick={() => exportToCSV(members, 'members_report')}>📊 Export Members</button>
          <button onClick={() => exportToCSV(payments, 'payments_report')}>💰 Export Payments</button>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Members</h2>
        <div className="recent-list">
          {members.slice(0, 10).map(member => (
            <div key={member.id} className="recent-item">
              <div>
                <strong>{member.name}</strong>
                <p>Joined: {member.join_date} | Plan: {member.plan}</p>
              </div>
              <span className={`status-${member.status}`}>{member.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;