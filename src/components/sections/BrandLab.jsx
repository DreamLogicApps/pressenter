import { motion } from 'framer-motion';

const BrandLab = () => {
  return (
    <section className="lab-section section-padding overflow-hidden">
      <div className="container">
        <h2 className="heading-xl mb-16 text-center">
          Built at <span className="text-editorial text-accent">PressEnter.</span>
        </h2>

        {/* Masonry / abstract grid placeholder for the Brand Lab */}
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden glass">
          
          <motion.div 
            className="absolute top-10 left-10 w-40 h-40 bg-accent rounded-full opacity-80 mix-blend-screen"
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600 rounded-lg opacity-50 mix-blend-screen"
            animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="heading-md text-white mix-blend-overlay opacity-30 text-center px-4">
              [ A constantly changing composition of logos, typography, color palettes, and motion graphics will be populated here ]
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandLab;
