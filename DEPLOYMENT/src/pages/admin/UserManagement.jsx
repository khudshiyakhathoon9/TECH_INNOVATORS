import { useState, useEffect } from 'react';
import { Edit2, Ban, Trash2, MoreVertical, Search, Filter } from 'lucide-react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'status-active';
      case 'Suspended': return 'status-suspended';
      case 'Inactive': return 'status-inactive';
      default: return '';
    }
  };

  return (
    <div className="user-management">
      <div className="admin-page-header">
        <h1>User Management</h1>
        <p>Manage employee accounts, roles, and access.</p>
      </div>

      <div className="admin-table-container glass-card">
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="toolbar-actions">
            <button className="btn btn-outline">
              <Filter size={16} /> Filter
            </button>
            <button className="btn btn-primary">Add New User</button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td><strong>{user.name}</strong></td>
                  <td className="text-secondary">{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.department}</td>
                  <td>
                    <span className={`status-pill ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn edit-btn" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="action-btn suspend-btn" title="Suspend">
                      <Ban size={16} />
                    </button>
                    <button className="action-btn delete-btn" title="Delete" onClick={() => handleDelete(user.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No users found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="table-pagination">
          <span className="text-secondary">Showing {filteredUsers.length} of {users.length} users</span>
          <div className="pagination-controls">
            <button className="btn btn-outline btn-sm" disabled>Previous</button>
            <button className="btn btn-outline btn-sm" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
