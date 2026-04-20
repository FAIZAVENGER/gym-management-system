import { useEffect, useState } from 'react';
import axios from 'axios';
import './Leads.css';

function Leads() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/leads');
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/leads/${id}/status?status=${status}`);
      fetchLeads();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm('Delete this lead?')) {
      try {
        await axios.delete(`http://localhost:8000/api/leads/${id}`);
        fetchLeads();
      } catch (error) {
        alert('Error deleting lead');
      }
    }
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(lead => lead.status === filter);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new': return <span className="badge-new">New</span>;
      case 'contacted': return <span className="badge-contacted">Contacted</span>;
      case 'converted': return <span className="badge-converted">Converted</span>;
      case 'lost': return <span className="badge-lost">Lost</span>;
      default: return <span className="badge-new">New</span>;
    }
  };

  return (
    <div className="leads-page">
      <div className="page-header">
        <h1>Leads from Website</h1>
      </div>

      <div className="filter-section">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
        <button className={`filter-btn ${filter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}>New</button>
        <button className={`filter-btn ${filter === 'contacted' ? 'active' : ''}`} onClick={() => setFilter('contacted')}>Contacted</button>
        <button className={`filter-btn ${filter === 'converted' ? 'active' : ''}`} onClick={() => setFilter('converted')}>Converted</button>
        <button className={`filter-btn ${filter === 'lost' ? 'active' : ''}`} onClick={() => setFilter('lost')}>Lost</button>
      </div>

      <div className="leads-list">
        {filteredLeads.map(lead => (
          <div key={lead.id} className="lead-card">
            <div className="lead-info">
              <h3>{lead.name}</h3>
              <p>📞 {lead.phone}</p>
              <p>🎯 Goal: {lead.goal}</p>
              <p>📅 {new Date(lead.created_at).toLocaleDateString()}</p>
            </div>
            <div className="lead-actions">
              {getStatusBadge(lead.status)}
              <select onChange={(e) => updateStatus(lead.id, e.target.value)} value={lead.status}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
              <button className="call-btn" onClick={() => window.open(`tel:${lead.phone}`)}>📞 Call</button>
              <button className="whatsapp-btn-lead" onClick={() => window.open(`https://wa.me/${lead.phone}`, '_blank')}>💬 WhatsApp</button>
              <button className="delete-lead-btn" onClick={() => deleteLead(lead.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="no-leads">
          <p>No leads found</p>
        </div>
      )}
    </div>
  );
}

export default Leads;