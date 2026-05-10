import { Leaf } from 'lucide-react';
import './LivingTree.css';

const LivingTree = ({ loadPercentage }) => {
  // Determine state based on load percentage
  let stateClass = 'healthy'; // < 50%
  let statusText = 'Optimal Efficiency';
  
  if (loadPercentage >= 100) {
    stateClass = 'critical';
    statusText = 'Critical Load - Auto Shutdown Initiated';
  } else if (loadPercentage >= 75) {
    stateClass = 'warning';
    statusText = 'High Load - Approaching Limit';
  } else if (loadPercentage >= 50) {
    stateClass = 'moderate';
    statusText = 'Moderate Usage';
  }

  // Calculate dynamic properties
  const leafCount = Math.max(1, 12 - Math.floor(loadPercentage / 10));
  const leaves = Array.from({ length: leafCount }, (_, i) => i);

  return (
    <div className={`living-tree-container ${stateClass}`}>
      <div className="status-badge glass-panel">
        <span className="status-dot"></span>
        {statusText}
      </div>
      
      <div className="tree-visual">
        {/* Central Core / Trunk */}
        <div className="core">
          <div className="pulse-ring"></div>
          <div className="pulse-ring delayed"></div>
          <Leaf className="core-icon" size={60} />
        </div>
        
        {/* Dynamic Energy Orbits (Leaves/Particles) */}
        <div className="orbits">
          {leaves.map((index) => (
            <div 
              key={index} 
              className="particle-orbit"
              style={{
                animationDuration: `${3 + (index * 0.5)}s`,
                transform: `rotate(${index * 30}deg)`
              }}
            >
              <div className="particle" style={{ animationDelay: `${index * 0.2}s` }}></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="metrics glass-panel">
        <div className="metric">
          <span className="label">Current Load</span>
          <span className="value">{loadPercentage}%</span>
        </div>
        <div className="metric">
          <span className="label">Eco-Score</span>
          <span className="value">{100 - loadPercentage + 20}</span>
        </div>
      </div>
    </div>
  );
};

export default LivingTree;
