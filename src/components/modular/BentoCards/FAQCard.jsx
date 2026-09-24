import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

const faqs = [
  {
    q: "How does the single-studio model work?",
    a: "You get a dedicated creative director who coordinates visual design, web engineering, and video production under one synchronized timeline."
  },
  {
    q: "What is the typical launch timeline?",
    a: "Most complete brand suites (Identity + Web + Video) are delivered in 3 to 5 weeks from kickoff."
  },
  {
    q: "Can I request individual services?",
    a: "Yes! You can hire us for standalone projects like custom web development, brand identity, or commercial video shoots."
  }
];

export default function FAQCard() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    audioManager.playToggle();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bento-card bento-faq">
      <div className="card-top-tag">
        <HelpCircle size={14} className="gold-text" />
        <span>FREQUENTLY ASKED QUESTIONS</span>
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div 
              key={i} 
              className={`faq-item ${isOpen ? 'open' : ''}`}
              onClick={() => toggle(i)}
              onMouseEnter={() => audioManager.playHover()}
            >
              <div className="faq-question-row">
                <span className="faq-question">{faq.q}</span>
                <ChevronDown size={14} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
              </div>
              {isOpen && (
                <p className="faq-answer">{faq.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
