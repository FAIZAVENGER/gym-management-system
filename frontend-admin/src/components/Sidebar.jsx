import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/members', icon: '👥', label: 'Members' },
    { path: '/payments', icon: '💰', label: 'Payments' },
    { path: '/leads', icon: '📋', label: 'Leads' },
    { path: '/attendance', icon: '📅', label: 'Attendance' },
    { path: '/reports', icon: '📈', label: 'Reports' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>💪 GymAdmin</h2>
        <p>Management System</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;