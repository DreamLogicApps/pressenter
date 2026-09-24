import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCommit, Search, Wand2, Rocket } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

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

  const nextStep = () => {
    audioManager.playToggle();
    setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    audioManager.playToggle();
    setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleDragEnd = (e, info) => {
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold) {
      nextStep();
    } else if (info.offset.x > swipeThreshold) {
      prevStep();
    }
  };

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
              onClick={() => {
                audioManager.playToggle();
                setActiveStep(idx);
              }}
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

      <motion.div 
        className="workflow-detail-box swipeable-area"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ touchAction: 'pan-y', cursor: 'grab' }}
        whileTap={{ cursor: 'grabbing' }}
      >
        <AnimatePresence mode="wait">
          <motion.p 
            key={activeStep}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3 }}
            className="workflow-desc"
          >
            {steps[activeStep].desc}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
