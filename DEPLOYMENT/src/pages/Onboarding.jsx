import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building, ShieldCheck, ArrowRight } from 'lucide-react';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else navigate('/dashboard');
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card glass-panel">
        <div className="progress-bar">
          <div className="progress" style={{ width: step === 1 ? '50%' : '100%' }}></div>
        </div>
        
        {step === 1 ? (
          <div className="onboarding-step">
            <div className="step-icon"><Building size={40} /></div>
            <h2>Join Your Department</h2>
            <p>Select your operational unit to start contributing to your team's energy goals.</p>
            
            <div className="options-grid">
              <label className="option-card">
                <input type="radio" name="dept" value="engineering" defaultChecked />
                <div className="option-content">
                  <span className="option-title">Engineering</span>
                  <span className="option-desc">Floor 4 - Block A</span>
                </div>
              </label>
              
              <label className="option-card">
                <input type="radio" name="dept" value="marketing" />
                <div className="option-content">
                  <span className="option-title">Marketing</span>
                  <span className="option-desc">Floor 2 - Block B</span>
                </div>
              </label>
              
              <label className="option-card">
                <input type="radio" name="dept" value="hr" />
                <div className="option-content">
                  <span className="option-title">Human Resources</span>
                  <span className="option-desc">Floor 1 - Block A</span>
                </div>
              </label>
            </div>
            
            <button className="btn btn-primary" onClick={handleNext}>
              Continue <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="onboarding-step">
            <div className="step-icon"><Users size={40} /></div>
            <h2>Referral Verification</h2>
            <p>Did a colleague invite you? Enter their code to both earn 50 Eco-Points.</p>
            
            <div className="input-group">
              <input type="text" placeholder="e.g. JD-8492" className="referral-input" />
            </div>
            
            <div className="referral-bonus glass-card">
              <ShieldCheck size={24} className="text-green" />
              <div>
                <strong>Bonus Active</strong>
                <p>Verify code to unlock immediate rewards!</p>
              </div>
            </div>
            
            <div className="action-buttons">
              <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>
                Skip
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Verify & Enter Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
