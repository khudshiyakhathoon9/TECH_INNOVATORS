import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import './AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    appName: '...',
    maintenanceMode: false,
    alertThresholdAmber: 0,
    alertThresholdRed: 0,
    maxAutoShutdowns: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/settings', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.appName) setSettings(data);
      })
      .catch(err => console.error("Settings fetch error:", err));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/settings', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(settings)
    })
    .then(() => alert('Settings saved successfully!'))
    .catch(err => console.error("Error saving settings:", err));
  };

  return (
    <div className="admin-settings">
      <div className="admin-page-header">
        <h1>Platform Settings</h1>
        <p>Configure global application rules and thresholds.</p>
      </div>

      <div className="settings-content">
        <form className="settings-form glass-card" onSubmit={handleSave}>
          
          <div className="settings-section">
            <h3>General Configuration</h3>
            
            <div className="form-group">
              <label>Application Name</label>
              <input 
                type="text" 
                value={settings.appName}
                onChange={e => setSettings({...settings, appName: e.target.value})}
              />
            </div>
            
            <div className="form-group checkbox-group">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.maintenanceMode}
                  onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})}
                />
                <span className="slider-toggle"></span>
              </label>
              <div className="toggle-label">
                <strong>Maintenance Mode</strong>
                <p>Disable non-admin access to the platform.</p>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Energy Simulation Thresholds</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Warning Threshold (%)</label>
                <input 
                  type="number" 
                  value={settings.alertThresholdAmber}
                  onChange={e => setSettings({...settings, alertThresholdAmber: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="form-group">
                <label>Critical / Auto-OFF Threshold (%)</label>
                <input 
                  type="number" 
                  value={settings.alertThresholdRed}
                  onChange={e => setSettings({...settings, alertThresholdRed: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Max Auto-Shutdowns per day</label>
              <input 
                type="number" 
                value={settings.maxAutoShutdowns}
                onChange={e => setSettings({...settings, maxAutoShutdowns: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="settings-actions">
            <button type="submit" className="btn btn-primary">
              <Save size={18} /> Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
