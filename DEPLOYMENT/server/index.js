const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'beyond_secret_key_2026';

app.use(cors());
app.use(express.json());

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Auth token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Request Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const data = db.read();
  const user = data.users.find(u => u.email === email);

  if (user && user.password && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      success: true, 
      token, 
      user: { name: user.name, email: user.email, role: user.role, department: user.department } 
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const data = db.read();
  const user = data.users.find(u => u.id === req.user.id);
  if (user) {
    res.json({ name: user.name, email: user.email, role: user.role, department: user.department, initials: user.name.substring(0, 2).toUpperCase() });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Protected API Endpoints

app.get('/api/stats', authenticateToken, (req, res) => {
  const data = db.read();
  res.json(data.stats);
});

app.get('/api/users', authenticateToken, (req, res) => {
  const data = db.read();
  // Don't send passwords back
  const users = data.users.map(({ password, ...u }) => u);
  res.json(users);
});

app.post('/api/users', authenticateToken, (req, res) => {
  const newUser = { 
    id: Date.now(), 
    ...req.body, 
    password: bcrypt.hashSync(req.body.password || 'welcome123', 10),
    status: 'Active' 
  };
  db.update(data => {
    data.users.push(newUser);
    return data;
  });
  res.status(201).json(newUser);
});

app.delete('/api/users/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  db.update(data => {
    data.users = data.users.filter(u => u.id !== id);
    return data;
  });
  res.json({ success: true });
});

app.get('/api/energy', authenticateToken, (req, res) => {
  const data = db.read();
  res.json(data.energyLoad);
});

app.post('/api/energy/load', authenticateToken, (req, res) => {
  const { load } = req.body;
  db.update(data => {
    data.energyLoad.current = load;
    data.energyLoad.ecoScore = 100 - load + 20;
    // Add to history
    if (!data.energyLoad.history) data.energyLoad.history = [];
    data.energyLoad.history.push(load);
    if (data.energyLoad.history.length > 20) data.energyLoad.history.shift();
    return data;
  });
  res.json({ success: true });
});

// ... other routes (activity, settings, etc.) with authenticateToken ...
app.get('/api/activity', authenticateToken, (req, res) => res.json(db.read().activity));
app.get('/api/settings', authenticateToken, (req, res) => res.json(db.read().settings));
app.get('/api/departments', authenticateToken, (req, res) => res.json(db.read().departments));
app.get('/api/rewards', authenticateToken, (req, res) => res.json({ rewards: db.read().rewards, userPoints: db.read().userPoints }));

// Simulation Engine
setInterval(() => {
  try {
    db.update(data => {
      const fluctuation = (Math.random() * 4) - 2;
      let newLoad = data.energyLoad.current + fluctuation;
      if (newLoad < 20) newLoad = 22;
      if (newLoad > 95) newLoad = 93;
      data.energyLoad.current = parseFloat(newLoad.toFixed(1));
      
      if (!data.energyLoad.history) data.energyLoad.history = [];
      data.energyLoad.history.push(data.energyLoad.current);
      if (data.energyLoad.history.length > 20) data.energyLoad.history.shift();
      
      return data;
    });
  } catch (err) {
    console.error('[Simulation Error]:', err.message);
  }
}, 5000);

app.listen(PORT, () => console.log(`Secure Backend running at http://localhost:${PORT}`));
