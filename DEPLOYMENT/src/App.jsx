import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';
import AdminLayout from './layouts/AdminLayout';
import AdminAuthWrapper from './components/admin/AdminAuthWrapper';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import AdminSettings from './pages/admin/AdminSettings';
import ContentManagement from './pages/admin/ContentManagement';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        
        {/* We want Navigation on all pages except Login and Onboarding, but for simplicity, we can just conditionally render it or handle it in the routes. Let's use a layout approach inside App */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AdminAuthWrapper>
              <AdminLayout />
            </AdminAuthWrapper>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
          
          {/* Protected/Main App Routes */}
          <Route path="/*" element={
            <>
              <Navigation />
              <main className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
