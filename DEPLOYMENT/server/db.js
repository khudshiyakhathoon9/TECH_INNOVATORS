const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'database.json');

// Admin password will be 'admin123'
const ADMIN_PASSWORD_HASH = "$2b$10$xTPQtlFojqnI8as/sZOW4OWaWsAtZ1sk97DClZfQPTOtrLb0AZXkm"; // admin123

const initialData = {
  stats: [
    { id: 1, title: 'Total Users', value: '1,248', trend: '+12%', icon: 'Users', color: 'var(--text-primary)' },
    { id: 2, title: 'Active Sessions', value: '342', trend: '+5%', icon: 'Activity', color: 'var(--accent-green)' },
    { id: 3, title: 'System Alerts', value: '4', trend: '-2', icon: 'AlertTriangle', color: 'var(--accent-amber)' },
    { id: 4, title: 'System Health', value: '99.8%', trend: 'Stable', icon: 'CheckCircle', color: 'var(--text-secondary)' },
  ],
  users: [
    { id: 1, name: 'Admin User', email: 'admin@beyond.com', password: ADMIN_PASSWORD_HASH, role: 'Admin', department: 'IT', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john@company.com', password: bcrypt.hashSync('user123', 10), role: 'Employee', department: 'Engineering', status: 'Active' },
  ],
  activity: [],
  settings: {
    appName: 'Beyond Monitoring',
    maintenanceMode: false,
    alertThresholdAmber: 75,
    alertThresholdRed: 100,
    maxAutoShutdowns: 3,
  },
  energyLoad: {
    current: 45,
    history: [45, 46, 44, 45, 47, 45, 44, 46, 45, 45], // Store last 10 readings
    ecoScore: 75,
    dailyUsage: '42.5 kWh',
    weeklyComparison: '-12%',
    activeRules: 4
  },
  departments: [
    { id: 1, name: 'Engineering', score: 9850, streak: 12, rank: 1, change: 'up' },
    { id: 2, name: 'Marketing', score: 8420, streak: 5, rank: 2, change: 'up' },
    { id: 3, name: 'Human Resources', score: 8100, streak: 2, rank: 3, change: 'down' }
  ],
  rewards: [
    { id: 1, title: 'Corporate Coffee Voucher', points: 100, available: true },
    { id: 2, title: 'Early Logout Pass (Friday)', points: 1000, available: true }
  ],
  userPoints: 1250,
};

const db = {
  read: () => {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(content);
  },
  
  write: (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  },

  update: (callback) => {
    const data = db.read();
    const updatedData = callback(data);
    db.write(updatedData);
    return updatedData;
  }
};

module.exports = db;
