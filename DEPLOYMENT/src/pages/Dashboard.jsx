import { useState, useEffect } from 'react';
import LivingTree from '../components/LivingTree';
import SmartMeterSlider from '../components/SmartMeterSlider';
import { Activity, Zap, TrendingDown } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [loadPercentage, setLoadPercentage] = useState(45);
  const [userProfile, setUserProfile] = useState({ department: 'Global' });
  const [energyData, setEnergyData] = useState({
    dailyUsage: '0 kWh',
    weeklyComparison: '0%',
    activeRules: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Fetch Profile
    fetch('http://localhost:3001/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUserProfile(data))
      .catch(err => console.error("Profile error:", err));

    const fetchData = () => {
      fetch('http://localhost:3001/api/energy', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setLoadPercentage(data.current);
          setEnergyData({
            dailyUsage: data.dailyUsage,
            weeklyComparison: data.weeklyComparison,
            activeRules: data.activeRules
          });
        })
        .catch(err => console.error("Error fetching energy data:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLoadChange = (newLoad) => {
    setLoadPercentage(newLoad);
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/energy/load', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ load: newLoad })
    }).catch(err => console.error("Error updating load:", err));
  };

  return (
    <div className="dashboard-container">
      <header className="page-header">
        <div>
          <div className="live-indicator" style={{ marginBottom: '0.5rem' }}>
            <span className="pulse-dot"></span> Live Monitoring Active
          </div>
          <h1>System Control Centre</h1>
          <p>Autonomous energy management and load balancing.</p>
        </div>
        <div className="dept-badge glass-panel">
          <span className="dot"></span> {userProfile.department}
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Main Visualizer (Living Tree) */}
        <div className="dashboard-main-panel glass-card">
          <h2>Energy Ecosystem</h2>
          <div className="tree-wrapper">
            <LivingTree loadPercentage={loadPercentage} />
          </div>
        </div>

        {/* Sidebar Controls & Stats */}
        <div className="dashboard-side-panel">
          <SmartMeterSlider 
            loadPercentage={loadPercentage} 
            setLoadPercentage={handleLoadChange} 
          />
          
          <div className="quick-stats glass-card">
            <h3>Real-Time Metrics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <Activity className="stat-icon text-green" />
                <div className="stat-info">
                  <span className="stat-val">{energyData.dailyUsage}</span>
                  <span className="stat-label">Daily Load</span>
                </div>
              </div>
              <div className="stat-box">
                <TrendingDown className="stat-icon text-amber" />
                <div className="stat-info">
                  <span className="stat-val">{energyData.weeklyComparison}</span>
                  <span className="stat-label">Efficiency Delta</span>
                </div>
              </div>
              <div className="stat-box">
                <Zap className="stat-icon" style={{ color: '#00B0FF' }} />
                <div className="stat-info">
                  <span className="stat-val">{energyData.activeRules} Nodes</span>
                  <span className="stat-label">Automation Rules</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
