import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, ShieldAlert } from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar glass-panel">
      <div className="admin-sidebar-header">
        <div className="admin-logo-icon">
          <ShieldAlert size={20} className="text-bg" />
        </div>
        <h2 className="admin-logo-text">BM<br/>Admin</h2>
      </div>
      
      <div className="admin-nav-links">
        <NavLink to="/admin" end className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
          <Users size={20} />
          <span>Users</span>
        </NavLink>
        
        <NavLink to="/admin/content" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
          <FileText size={20} />
          <span>Content</span>
        </NavLink>
        
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
