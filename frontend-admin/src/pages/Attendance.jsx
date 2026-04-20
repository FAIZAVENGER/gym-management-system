import { useEffect, useState } from 'react';
import axios from 'axios';
import './Attendance.css';

function Attendance() {
  const [attendance, setAttendance] = useState(null);
  const [memberId, setMemberId] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchAttendance();
    fetchMembers();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/attendance/today');
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const markAttendance = async () => {
    if (!memberId) {
      alert('Please enter or select a member ID');
      return;
    }
    try {
      await axios.post(`http://localhost:8000/api/attendance/${memberId}`);
      alert('Attendance marked successfully!');
      setMemberId('');
      fetchAttendance();
    } catch (error) {
      alert('Error marking attendance');
    }
  };

  return (
    <div className="attendance-page">
      <div className="page-header">
        <h1>Daily Attendance</h1>
      </div>

      <div className="attendance-form">
        <h2>Mark Attendance</h2>
        <div className="mark-form">
          <select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
            <option value="">Select Member</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>{member.name} - {member.phone}</option>
            ))}
          </select>
          <button onClick={markAttendance}>✅ Mark Present</button>
        </div>
      </div>

      <div className="today-attendance">
        <h2>Today's Attendance ({attendance?.date})</h2>
        <div className="attendance-stats">
          <div className="stat">
            <div className="stat-number">{attendance?.count || 0}</div>
            <div className="stat-label">Members Present</div>
          </div>
        </div>

        <div className="attendance-list">
          {attendance?.members.map((member, index) => (
            <div key={index} className="attendance-item">
              <div>
                <strong>{member.name}</strong>
                <p>Checked in: {new Date(member.time).toLocaleTimeString()}</p>
              </div>
              <span className="present-badge">✓ Present</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Attendance;