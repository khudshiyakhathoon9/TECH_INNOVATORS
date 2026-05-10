// Initial data store for the Beyond Monitoring application
const data = {
  stats: [
    { id: 1, title: 'Total Users', value: '1,248', trend: '+12%', icon: 'Users', color: 'var(--text-primary)' },
    { id: 2, title: 'Active Sessions', value: '342', trend: '+5%', icon: 'Activity', color: 'var(--accent-green)' },
    { id: 3, title: 'System Alerts', value: '4', trend: '-2', icon: 'AlertTriangle', color: 'var(--accent-amber)' },
    { id: 4, title: 'System Health', value: '99.8%', trend: 'Stable', icon: 'CheckCircle', color: 'var(--text-secondary)' },
  ],
  
  users: [
    { id: 1, name: 'John Doe (Live)', email: 'john@company.com', role: 'Employee', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Jane Smith (Live)', email: 'jane@company.com', role: 'Manager', department: 'Marketing', status: 'Active' },
    { id: 3, name: 'Mike Johnson (Live)', email: 'mike@company.com', role: 'Employee', department: 'HR', status: 'Suspended' },
    { id: 4, name: 'Sarah Williams (Live)', email: 'sarah@company.com', role: 'Admin', department: 'IT', status: 'Active' },
    { id: 5, name: 'Robert Brown (Live)', email: 'robert@company.com', role: 'Employee', department: 'Engineering', status: 'Inactive' },
    { id: 6, name: 'Emily Davis (Live)', email: 'emily@company.com', role: 'Employee', department: 'Operations', status: 'Active' },
  ],
  
  activity: [
    { id: 1, user: 'John Doe', action: 'Requested password reset', time: '5 mins ago', type: 'security' },
    { id: 2, user: 'System', action: 'Auto-shutdown triggered for Marketing Block B', time: '12 mins ago', type: 'system' },
    { id: 3, user: 'Jane Smith', action: 'Redeemed "Corporate Coffee Voucher"', time: '1 hour ago', type: 'reward' },
    { id: 4, user: 'Admin', action: 'Updated Global Threshold Config', time: '3 hours ago', type: 'admin' },
    { id: 5, user: 'Engineering Dept', action: 'Reached 12-day efficiency streak', time: '5 hours ago', type: 'achievement' },
  ],
  
  settings: {
    appName: 'Beyond Monitoring',
    maintenanceMode: false,
    alertThresholdAmber: 75,
    alertThresholdRed: 100,
    maxAutoShutdowns: 3,
  },
  
  energyLoad: {
    current: 45,
    history: [40, 42, 45, 43, 44, 45],
    ecoScore: 75,
    dailyUsage: '42.5 kWh',
    weeklyComparison: '-12%',
    activeRules: 4
  },
  
  departments: [
    { id: 1, name: 'Engineering', score: 9850, streak: 12, rank: 1, change: 'up' },
    { id: 2, name: 'Marketing', score: 8420, streak: 5, rank: 2, change: 'up' },
    { id: 3, name: 'Human Resources', score: 8100, streak: 2, rank: 3, change: 'down' },
    { id: 4, name: 'Finance', score: 7650, streak: 0, rank: 4, change: 'same' },
    { id: 5, name: 'Operations', score: 6200, streak: 0, rank: 5, change: 'down' }
  ],
  
  rewards: [
    { id: 1, title: 'Corporate Coffee Voucher', points: 100, available: true },
    { id: 2, title: 'Early Logout Pass (Friday)', points: 1000, available: true },
    { id: 3, title: 'Prime Parking Privilege', points: 2000, available: false },
    { id: 4, title: 'Eco-Champion Badge', points: 5000, available: false },
  ],
  
  userPoints: 1250
};

module.exports = data;
