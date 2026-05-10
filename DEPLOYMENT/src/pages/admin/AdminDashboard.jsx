import { useState, useEffect } from 'react';
import { Users, Activity, AlertTriangle, CheckCircle, ArrowUpRight, Clock } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Fetch stats
    fetch('http://localhost:3001/api/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const iconMap = { Users, Activity, AlertTriangle, CheckCircle };
          const mappedStats = data.map(s => ({
            ...s,
            icon: iconMap[s.icon] ? iconMap[s.icon]({ size: 24 }) : <Activity size={24} />
          }));
          setStats(mappedStats);
        }
      })
      .catch(err => console.error("Stats fetch error:", err));

    // Fetch activity
    fetch('http://localhost:3001/api/activity', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setRecentActivity(data);
      })
      .catch(err => console.error("Activity fetch error:", err));
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1>Overview</h1>
        <p>Monitor platform statistics and recent activities.</p>
      </div>

      <div className="admin-stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="admin-stat-card glass-card">
            <div className="stat-header">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-icon-wrapper" style={{ color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className="stat-body">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-trend">
                {stat.trend.startsWith('+') && <ArrowUpRight size={14} />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-activity-section glass-card">
        <div className="section-header">
          <h2>Recent Activity Feed</h2>
          <button className="btn btn-outline btn-sm">View All</button>
        </div>
        
        <div className="activity-list">
          {recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                <Clock size={16} />
              </div>
              <div className="activity-content">
                <p>
                  <strong>{activity.user}</strong> {activity.action}
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
              <div className={`activity-type-badge type-${activity.type}`}>
                {activity.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
