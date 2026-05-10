import { useState, useEffect } from 'react';
import { Coffee, Clock, Car, Star, CheckCircle } from 'lucide-react';
import './Rewards.css';

const Rewards = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [rewardsList, setRewardsList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/rewards')
      .then(res => res.json())
      .then(data => {
        setUserPoints(data.userPoints);
        
        // Map icons back to reward items
        const iconMap = { 
          'Corporate Coffee Voucher': <Coffee size={24} />,
          'Early Logout Pass (Friday)': <Clock size={24} />,
          'Prime Parking Privilege': <Car size={24} />,
          'Eco-Champion Badge': <Star size={24} />
        };
        
        const mappedRewards = data.rewards.map(r => ({
          ...r,
          icon: iconMap[r.title] || <Star size={24} />
        }));
        setRewardsList(mappedRewards);
      })
      .catch(err => console.error("Error fetching rewards:", err));
  }, []);

  return (
    <div className="rewards-container">
      <header className="page-header">
        <div>
          <h1>Rewards Marketplace</h1>
          <p>Exchange your Eco-Points for exclusive corporate perks.</p>
        </div>
        <div className="points-balance glass-panel">
          <span className="balance-label">Your Balance</span>
          <span className="balance-val text-green">{userPoints.toLocaleString()} PTS</span>
        </div>
      </header>

      <div className="rewards-grid">
        <div className="rewards-list">
          {rewardsList.map((reward) => (
            <div key={reward.id} className={`reward-card glass-card ${!reward.available ? 'locked' : ''}`}>
              <div className="reward-icon">{reward.icon}</div>
              <div className="reward-info">
                <h3>{reward.title}</h3>
                <div className="reward-cost">
                  <span className="cost-val">{reward.points}</span>
                  <span className="cost-label">Eco-Points</span>
                </div>
              </div>
              <div className="reward-action">
                {reward.available ? (
                  <button className="btn btn-primary claim-btn">Claim Reward</button>
                ) : (
                  <div className="locked-status">
                    <span>{reward.points - userPoints} more pts needed</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="activity-heatmap glass-card">
          <h3>Your Activity Heatmap</h3>
          <p className="heatmap-desc">Your daily energy saving contributions over the last 30 days.</p>
          
          <div className="heatmap-grid">
            {/* Generating random heatmap squares for demonstration */}
            {Array.from({ length: 30 }).map((_, i) => {
              const intensity = Math.random();
              let bgColor = 'rgba(255, 255, 255, 0.05)';
              if (intensity > 0.8) bgColor = 'var(--accent-green)';
              else if (intensity > 0.5) bgColor = 'rgba(0, 230, 118, 0.6)';
              else if (intensity > 0.2) bgColor = 'rgba(0, 230, 118, 0.3)';
              
              return (
                <div 
                  key={i} 
                  className="heat-square" 
                  style={{ background: bgColor }}
                  title={`Day ${30-i}: Contribution level`}
                ></div>
              );
            })}
          </div>
          
          <div className="heatmap-legend">
            <span>Less</span>
            <div className="legend-colors">
              <div style={{ background: 'rgba(255, 255, 255, 0.05)' }}></div>
              <div style={{ background: 'rgba(0, 230, 118, 0.3)' }}></div>
              <div style={{ background: 'rgba(0, 230, 118, 0.6)' }}></div>
              <div style={{ background: 'var(--accent-green)' }}></div>
            </div>
            <span>More</span>
          </div>

          <div className="recent-activity">
            <h4>Recent Earns</h4>
            <div className="activity-item">
              <CheckCircle size={16} className="text-green" />
              <div className="activity-details">
                <span>Auto-shutdown during off-hours</span>
                <span className="activity-time">Yesterday</span>
              </div>
              <span className="activity-points text-green">+50</span>
            </div>
            <div className="activity-item">
              <CheckCircle size={16} className="text-green" />
              <div className="activity-details">
                <span>7-Day Department Streak</span>
                <span className="activity-time">3 days ago</span>
              </div>
              <span className="activity-points text-green">+200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
