import React, { useState } from 'react';
import { Calculator, Check, ArrowRight } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

const serviceOptions = [
  { id: 'identity', label: 'Brand Identity & Logo System', price: 3500 },
  { id: 'web', label: 'Custom Web Design & Engineering', price: 4500 },
  { id: 'video', label: 'Video Production & Commercial Shoot', price: 3000 },
  { id: 'social', label: 'Social Media Management & Creatives', price: 2000 },
  { id: 'motion', label: '3D Motion Graphics & Animation', price: 1500 }
];

export default function EstimatorCard({ onOpenContact }) {
  const [selected, setSelected] = useState(['identity', 'web']);

  const toggleService = (id) => {
    audioManager.playToggle();
    if (selected.includes(id)) {
      if (selected.length > 1) {
        setSelected(selected.filter((item) => item !== id));
      }
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleCtaClick = () => {
    audioManager.playClick();
    onOpenContact();
  };

  const totalPrice = selected.reduce((sum, id) => {
    const item = serviceOptions.find((s) => s.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  // Agency comparison estimate (typical 5 agency markup is ~40% higher)
  const agencyPrice = Math.round(totalPrice * 1.45);
  const totalSavings = agencyPrice - totalPrice;

  return (
    <div className="bento-card bento-estimator">
      <div className="card-top-tag">
        <Calculator size={14} className="gold-text" />
        <span>INSTANT PACKAGE ESTIMATOR</span>
      </div>

      <div className="estimator-options-list">
        {serviceOptions.map((opt) => {
          const isChecked = selected.includes(opt.id);
          return (
            <div
              key={opt.id}
              className={`estimator-row ${isChecked ? 'selected' : ''}`}
              onClick={() => toggleService(opt.id)}
              onMouseEnter={() => audioManager.playHover()}
            >
              <div className="custom-checkbox">
                {isChecked && <Check size={12} className="check-icon" />}
              </div>
              <span className="opt-label">{opt.label}</span>
              <span className="opt-price">${opt.price.toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      <div className="estimator-summary-box">
        <div className="summary-left">
          <div className="estimate-total-label">PRESSENTER PACKAGE ESTIMATE</div>
          <div className="estimate-price-tag">${totalPrice.toLocaleString()}</div>
          <div className="estimate-savings">
            Save ~${totalSavings.toLocaleString()} vs 5 separate agencies
          </div>
        </div>

        <button 
          className="estimator-cta-btn" 
          onClick={handleCtaClick}
          onMouseEnter={() => audioManager.playHover()}
        >
          <span>Lock In Estimate</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
