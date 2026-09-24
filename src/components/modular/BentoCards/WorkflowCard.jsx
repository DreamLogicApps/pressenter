import React, { useState } from 'react';
import { GitCommit, Search, Wand2, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discovery & Blueprint',
    icon: Search,
    desc: 'Deep audit of target audience, competitive landscape, and brand positioning.'
  },
  {
    num: '02',
    title: 'Unified Craft & Creation',
    icon: Wand2,
    desc: 'Parallel execution of design systems, web development, and media production.'
  },
  {
    num: '03',
    title: 'Launch & Growth Engine',
    icon: Rocket,
    desc: 'Deployment of digital assets, campaign rollouts, and continuous conversion optimization.'
  }
];

export default function WorkflowCard() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bento-card bento-workflow">
      <div className="card-top-tag">
        <GitCommit size={14} className="gold-text" />
        <span>STUDIO WORKFLOW</span>
      </div>

      <div className="workflow-steps-row">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStep;
          return (
            <div
              key={step.num}
              className={`workflow-step-node ${isActive ? 'active' : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <div className="step-num-badge">{step.num}</div>
              <div className="step-node-title">
                <Icon size={14} className="step-icon" />
                <span>{step.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="workflow-detail-box">
        <p className="workflow-desc">{steps[activeStep].desc}</p>
      </div>
    </div>
  );
}
