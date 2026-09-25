import React from 'react';
import { Award, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import AnimatedCounter from '../../common/AnimatedCounter';

export default function MetricsCard() {
  return (
    <div className="bento-card bento-metrics">
      <div className="card-top-tag">
        <TrendingUp size={14} className="gold-text" />
        <span>STUDIO PERFORMANCE</span>
      </div>

      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-icon-wrap"><Award size={16} className="gold-text" /></div>
          <div className="metric-value">
            <AnimatedCounter value={120} suffix="+" />
          </div>
          <div className="metric-label">Brands Launched</div>
        </div>

        <div className="metric-item">
          <div className="metric-icon-wrap"><ShieldCheck size={16} className="gold-text" /></div>
          <div className="metric-value">
            <AnimatedCounter value={99.4} suffix="%" />
          </div>
          <div className="metric-label">Client Satisfaction</div>
        </div>

        <div className="metric-item">
          <div className="metric-icon-wrap"><Zap size={16} className="gold-text" /></div>
          <div className="metric-value">
            <AnimatedCounter value={3} suffix="x" />
          </div>
          <div className="metric-label">Execution Speed</div>
        </div>
      </div>
    </div>
  );
}
