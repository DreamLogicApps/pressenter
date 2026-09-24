import React from 'react';
import { Send, Sparkles, MessageCircle } from 'lucide-react';

export default function ContactCard({ onOpenContact }) {
  return (
    <div className="bento-card bento-contact-cta" onClick={onOpenContact}>
      <div className="contact-cta-glow" />
      <div className="card-top-tag">
        <Sparkles size={14} className="gold-text" />
        <span>KICKSTART YOUR BRAND</span>
      </div>

      <div className="contact-cta-content">
        <h3 className="contact-cta-heading">
          Ready to Build Something Extraordinary?
        </h3>
        <p className="contact-cta-sub">
          Book a 15-minute strategy call with our creative director today.
        </p>

        <div className="contact-cta-action">
          <div className="cta-icon-circle">
            <Send size={16} />
          </div>
          <span className="action-text">GET IN TOUCH NOW</span>
        </div>
      </div>
    </div>
  );
}
