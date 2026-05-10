import { Sliders, Zap, ZapOff } from 'lucide-react';
import './SmartMeterSlider.css';

const SmartMeterSlider = ({ loadPercentage, setLoadPercentage }) => {
  const isAutoOff = loadPercentage >= 100;

  const handleSliderChange = (e) => {
    // If it reached 100, we lock it momentarily to simulate auto-shutdown
    if (isAutoOff) return;
    setLoadPercentage(parseInt(e.target.value));
  };

  const resetSystem = () => {
    setLoadPercentage(40);
  };

  return (
    <div className="smart-meter-card glass-card">
      <div className="card-header">
        <div className="card-title">
          <Sliders size={20} className="text-green" />
          <h3>Smart Meter Simulation</h3>
        </div>
        <div className={`status-pill ${isAutoOff ? 'pill-danger' : 'pill-active'}`}>
          {isAutoOff ? 'SYSTEM LOCKED' : 'ACTIVE'}
        </div>
      </div>
      
      <div className="slider-container">
        <div className="slider-labels">
          <span>0%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={loadPercentage} 
          onChange={handleSliderChange}
          className={`slider ${loadPercentage >= 75 ? (loadPercentage >= 100 ? 'slider-red' : 'slider-amber') : 'slider-green'}`}
          disabled={isAutoOff}
        />
        
        <div className="slider-markers">
          <div className="marker" style={{ left: '50%' }}></div>
          <div className="marker warning" style={{ left: '75%' }}></div>
          <div className="marker critical" style={{ left: '100%' }}></div>
        </div>
      </div>
      
      <div className="auto-off-logic">
        <h4>PIR Sensor / Auto-OFF Logic</h4>
        <div className="logic-status">
          {isAutoOff ? (
            <div className="logic-alert critical-alert">
              <ZapOff size={24} />
              <div>
                <strong>Auto-Shutdown Executed</strong>
                <p>Non-essential loads have been terminated. Occupancy zero.</p>
              </div>
              <button className="btn btn-outline reset-btn" onClick={resetSystem}>
                Manual Override
              </button>
            </div>
          ) : (
            <div className="logic-alert info-alert">
              <Zap size={24} />
              <div>
                <strong>Monitoring Occupancy</strong>
                <p>Slide past 100% to simulate zero occupancy and trigger Auto-OFF.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartMeterSlider;
