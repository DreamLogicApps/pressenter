import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioManager } from '../../../utils/audioManager';

const testimonials = [
  {
    quote: "PressEnter replaced three separate agencies we were managing. They built our visual identity, web platform, and launch campaign in just 25 days.",
    author: "Elena Rostova",
    role: "Founder & CEO, Aether Monolith",
    stats: "2.4x Conversion Increase"
  },
  {
    quote: "The single-director model is a game changer. No miscommunication, zero delay. Our brand shoot and 3D motion trailers look like a Fortune 500 launch.",
    author: "Marcus Vance",
    role: "Head of Brand, Velocity Dynamics",
    stats: "3M+ Organic Views"
  },
  {
    quote: "Working with PressEnter was the best capital decision we made before launch. Complete identity system delivered with incredible attention to detail.",
    author: "Sarah Chen",
    role: "Managing Director, Aurora Capital",
    stats: "$4.2M Seed Round Closed"
  }
];

export default function TestimonialsCard() {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    audioManager.playToggle();
    setCurrent((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    audioManager.playToggle();
    setCurrent((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const handleDragEnd = (e, info) => {
    const swipeThreshold = 35;
    if (info.offset.x < -swipeThreshold) {
      next();
    } else if (info.offset.x > swipeThreshold) {
      prev();
    }
  };

  return (
    <div className="bento-card bento-testimonials">
      <div className="card-top-tag">
        <MessageSquareQuote size={14} className="gold-text" />
        <span>CLIENT IMPACT & TESTIMONIALS</span>
      </div>

      <motion.div 
        className="testimonial-body swipeable-area"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ touchAction: 'pan-y', cursor: 'grab' }}
        whileTap={{ cursor: 'grabbing' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="testimonial-panel"
          >
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="gold-star" fill="#C3922E" />
              ))}
            </div>

            <p className="testimonial-quote">"{testimonials[current].quote}"</p>

            <div className="testimonial-meta-row">
              <div>
                <h4 className="author-name">{testimonials[current].author}</h4>
                <p className="author-role">{testimonials[current].role}</p>
              </div>
              <div className="impact-badge">
                <span>{testimonials[current].stats}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="testimonial-controls">
        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <span 
              key={i} 
              className={`t-dot ${i === current ? 'active' : ''}`}
              onClick={() => {
                audioManager.playToggle();
                setCurrent(i);
              }}
            />
          ))}
        </div>

        <div className="nav-arrow-btns">
          <button 
            className="t-arrow-btn" 
            onClick={prev}
            onMouseEnter={() => audioManager.playHover()}
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            className="t-arrow-btn" 
            onClick={next}
            onMouseEnter={() => audioManager.playHover()}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
