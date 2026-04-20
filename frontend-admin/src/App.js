import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Payments from './pages/Payments';
import Leads from './pages/Leads';
import Reports from './pages/Reports';
import Attendance from './pages/Attendance';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="admin-app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;