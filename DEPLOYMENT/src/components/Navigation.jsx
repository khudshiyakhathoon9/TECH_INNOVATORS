import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Trophy, Gift, LogOut } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
  const [user, setUser] = useState({ name: 'Loading...', department: '...', initials: '?' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.name) setUser(data);
      })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <nav className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-icon">BM</div>
        <h2 className="logo-text">Beyond<br/>Monitoring</h2>
      </div>
      
      <div className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Trophy size={20} />
          <span>Leaderboard</span>
        </NavLink>
        
        <NavLink to="/rewards" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Gift size={20} />
          <span>Rewards</span>
        </NavLink>
      </div>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">{user.initials}</div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-dept">{user.department}</span>
          </div>
        </div>
        <NavLink to="/login" className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
        </NavLink>
      </div>
    </nav>
  );
};


export default Navigation;
