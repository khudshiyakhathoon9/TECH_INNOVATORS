import { useState, useEffect } from 'react';
import { Trophy, Flame, ChevronUp, ChevronDown, Minus } from 'lucide-react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <div className="leaderboard-container">
      <header className="page-header">
        <div>
          <h1>Departmental Competition</h1>
          <p>Compete for the highest Eco-Score and maintain your efficiency streaks.</p>
        </div>
      </header>

      <div className="leaderboard-content glass-card">
        <div className="table-header">
          <div className="col-rank">Rank</div>
          <div className="col-dept">Department</div>
          <div className="col-score">Eco-Points</div>
          <div className="col-streak">Streak</div>
        </div>
        
        <div className="table-body">
          {departments.map((dept) => (
            <div key={dept.id} className={`table-row ${dept.rank === 1 ? 'rank-1' : ''}`}>
              <div className="col-rank">
                <span className="rank-number">{dept.rank}</span>
                {dept.change === 'up' && <ChevronUp className="text-green" size={16} />}
                {dept.change === 'down' && <ChevronDown className="text-red" size={16} />}
                {dept.change === 'same' && <Minus className="text-secondary" size={16} />}
              </div>
              
              <div className="col-dept">
                <div className="dept-name">{dept.name}</div>
                {dept.rank === 1 && <Trophy className="text-amber trophy-icon" size={16} />}
              </div>
              
              <div className="col-score text-green font-heading">{dept.score.toLocaleString()}</div>
              
              <div className="col-streak">
                {dept.streak > 0 ? (
                  <div className="streak-badge">
                    <Flame className="text-amber" size={16} />
                    <span>{dept.streak} Days</span>
                  </div>
                ) : (
                  <span className="text-secondary">No Streak</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="leaderboard-insight glass-card">
        <h3>Insights</h3>
        <p>Engineering has maintained a 12-day efficiency streak, saving approximately 450 kWh. Marketing is closing the gap with a recent 15% improvement in off-hours energy reduction.</p>
      </div>
    </div>
  );
};

export default Leaderboard;
