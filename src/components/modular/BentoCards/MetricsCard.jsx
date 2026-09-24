import React from 'react';
import { Award, ShieldCheck, Zap } from 'lucide-react';

export default function MetricsCard() {
  return (
    <div className="bento-card bento-metrics">
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-icon-wrap"><Award size={16} className="gold-text" /></div>
          <div className="metric-value">50+</div>
          <div className="metric-label">Brands Launched</div>
        </div>
        <div className="metric-item">
          <div className="metric-icon-wrap"><ShieldCheck size={16} className="gold-text" /></div>
          <div className="metric-value">99.4%</div>
          <div className="metric-label">Satisfaction Rate</div>
        </div>
        <div className="metric-item">
          <div className="metric-icon-wrap"><Zap size={16} className="gold-text" /></div>
          <div className="metric-value">3x</div>
          <div className="metric-label">Execution Velocity</div>
        </div>
      </div>
    </div>
  );
}
