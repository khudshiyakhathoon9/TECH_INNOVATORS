import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard'); // Go straight to dashboard after secure login
      } else {
        setError(data.message || 'Invalid credentials');
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      setError('Server connection failed. Is the backend running?');
    });
  };

  return (
    <div className="login-container">
      <div className="login-split login-left">
        <div className="login-brand">
          <div className="logo-icon-large">BM</div>
          <h1>Beyond<br/>Monitoring</h1>
        </div>
        
        <div className="login-content">
          <div className="welcome-text">
            <h2>Welcome to the Future of Energy</h2>
            <p>Monitor, Analyze, Alert, Automate, and Engage. Your central hub for sustainable operations.</p>
          </div>
          
          <form className="login-form glass-card" onSubmit={handleLogin}>
            <h3>Sign In to Workspace</h3>
            
            {error && <div className="login-error" style={{ color: 'var(--accent-red)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
            
            <div className="input-group">
              <label htmlFor="email">Corporate Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary login-btn">
              Access Dashboard <ArrowRight size={18} />
            </button>
            
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
      
      <div className="login-split login-right">
        <div className="visual-showcase">
          {/* Decorative elements representing the "Living Tree" and energy */}
          <div className="tree-graphic">
            <Leaf size={120} className="glow-leaf" />
            <div className="energy-ring ring-1"></div>
            <div className="energy-ring ring-2"></div>
            <div className="energy-ring ring-3"></div>
          </div>
          
          <div className="quote-box glass-card">
            <p className="vision-statement">
              "People do not change behavior just by seeing data. They change behavior when the system is simple, engaging, automated, competitive, and rewarding."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
