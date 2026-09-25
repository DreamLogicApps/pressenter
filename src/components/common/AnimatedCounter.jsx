import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1500 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number from string value (e.g. "99.4" from "99.4", "4.8" from "4.8", "120" from "120")
  const numericVal = parseFloat(value) || 0;
  const isFloat = value.toString().includes('.');

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // EaseOutExpo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNum = easeProgress * numericVal;

      setDisplayValue(isFloat ? currentNum.toFixed(1) : Math.floor(currentNum));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericVal, duration, isFloat]);

  return (
    <span ref={ref} className="animated-counter-value">
      {prefix}{displayValue}{suffix}
    </span>
  );
}
