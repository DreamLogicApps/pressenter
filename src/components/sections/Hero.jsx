import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Mouse parallax effect for floating cards
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to('.hero-card-1', { x: x * 2, y: y * 2, duration: 1, ease: 'power2.out' });
      gsap.to('.hero-card-2', { x: x * -1.5, y: y * -1.5, duration: 1, ease: 'power2.out' });
      gsap.to('.hero-card-3', { x: x * 1, y: y * -1, duration: 1, ease: 'power2.out' });
      gsap.to('.hero-card-4', { x: x * -2, y: y * 1, duration: 1, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="hero-section">
      <div className="container h-full flex flex-col justify-center relative z-normal">
        
        <motion.div 
          style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          className="hero-content"
        >
          <motion.h1 
            className="heading-massive hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Your brand.<br />
            <span className="text-editorial">All in one place.</span>
          </motion.h1>

          <motion.p 
            className="body-lg hero-copy mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            From identity to websites, content to campaigns — <br className="desktop-only" />
            everything your brand needs, under one roof.
          </motion.p>
        </motion.div>

      </div>

      {/* Floating Elements Background */}
      <div className="hero-floating-elements absolute inset-0 z-negative overflow-hidden">
        <motion.div style={{ y: y1 }} className="hero-card hero-card-1 glass">
          <div className="card-placeholder text-accent">LOGO</div>
        </motion.div>
        
        <motion.div style={{ y: y2 }} className="hero-card hero-card-2 glass-dark">
          <div className="card-placeholder ui-mockup">
            <div className="ui-header"></div>
            <div className="ui-body"></div>
          </div>
        </motion.div>
        
        <motion.div style={{ y: y3 }} className="hero-card hero-card-3 glass-light">
          <div className="card-placeholder font-editorial" style={{color: 'var(--color-black)', fontSize: '2rem'}}>Aa</div>
        </motion.div>
        
        <motion.div style={{ y: y1 }} className="hero-card hero-card-4 glass">
          <div className="card-placeholder video-mockup">
            <div className="play-icon">▶</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
