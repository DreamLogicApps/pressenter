import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ThePressEnterIdea = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="idea-section section-padding h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container text-center relative z-10">
        <motion.div style={{ y, opacity }}>
          <h2 className="heading-xl font-medium mb-8">
            One brand.<br/>
            <span className="text-editorial text-gray">One creative partner.</span>
          </h2>
          
          <p className="body-lg max-w-2xl mx-auto">
            You bring the idea. We build everything around it.<br/>
            No more fragmented teams, inconsistent design, or wasted time.
          </p>
        </motion.div>
      </div>
      
      {/* Subtle Background Accent */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at center, var(--color-accent) 0%, transparent 50%)',
          transform: 'scale(1.5)'
        }}
      />
    </section>
  );
};

export default ThePressEnterIdea;
