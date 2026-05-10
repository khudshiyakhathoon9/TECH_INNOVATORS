import { Search, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="admin-navbar glass-panel">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search users, settings, logs..." 
          className="admin-search-input"
        />
      </div>
      
      <div className="admin-navbar-right">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        
        <div className="admin-profile">
          <div className="admin-avatar">A</div>
          <div className="admin-info">
            <span className="admin-name">Super Admin</span>
            <span className="admin-role">System Root</span>
          </div>
        </div>
        
        <button className="icon-btn logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
