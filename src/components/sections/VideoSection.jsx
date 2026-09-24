import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './VideoSection.css';

const VideoSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="video-section section-padding relative overflow-hidden">
      <div className="container relative h-[80vh] min-h-[600px] flex items-center justify-center">
        
        {/* Video Wrapper with Scroll Scale */}
        <motion.div 
          className="video-wrapper absolute inset-0 z-0 rounded-2xl overflow-hidden"
          style={{ scale }}
        >
          <div className="video-placeholder bg-gray-900 w-full h-full flex flex-col items-center justify-center relative">
            {/* Cinematic Placeholder */}
            <div className="absolute inset-0 bg-black opacity-40 mix-blend-overlay"></div>
            <div className="play-icon text-white text-5xl mb-4 relative z-10 opacity-50">▶</div>
            <p className="label-sm text-gray relative z-10">[ Video Reel Placeholder ]</p>
          </div>
        </motion.div>

        {/* Oversized Typography Overlay */}
        <motion.div 
          className="relative z-10 text-center pointer-events-none"
          style={{ y: yText }}
        >
          <h2 className="video-heading">
            WE MAKE<br/>
            <span className="text-editorial">BRANDS MOVE.</span>
          </h2>
        </motion.div>

      </div>
    </section>
  );
};

export default VideoSection;
