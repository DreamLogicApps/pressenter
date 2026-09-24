import { motion } from 'framer-motion';
import './FinalCTA.css';

const FinalCTA = () => {
  return (
    <section className="final-cta-section section-padding relative overflow-hidden h-screen flex flex-col justify-center items-center text-center">
      
      <div className="container relative z-10">
        
        <motion.h2 
          className="heading-massive mb-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          Ready to <br/>
          <span className="text-editorial text-accent">press enter?</span>
        </motion.h2>

        <motion.p 
          className="body-lg text-gray mb-16 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let's build a brand people remember.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#contact" className="magnetic-button heading-md">
            <span className="btn-text">Start a project</span>
            <span className="btn-arrow">→</span>
          </a>
        </motion.div>

      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 z-0 bg-charcoal pointer-events-none cta-bg"></div>
    </section>
  );
};

export default FinalCTA;
