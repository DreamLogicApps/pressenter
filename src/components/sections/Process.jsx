import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  { num: '01', title: 'DISCOVER', desc: 'Understand the business, audience and goals.' },
  { num: '02', title: 'DEFINE', desc: 'Shape the brand direction and strategy.' },
  { num: '03', title: 'CREATE', desc: 'Design, build, shoot and produce.' },
  { num: '04', title: 'LAUNCH', desc: 'Bring everything together seamlessly.' },
  { num: '05', title: 'GROW', desc: 'Continue evolving the brand with content.' }
];

const Process = () => {
  const containerRef = useRef(null);
  
  return (
    <section className="process-section section-padding" id="process" ref={containerRef}>
      <div className="container">
        
        <h2 className="heading-xl mb-24 text-center">
          How we <span className="text-editorial text-gray">build it.</span>
        </h2>

        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} containerRef={containerRef} />
          ))}
        </div>

      </div>
    </section>
  );
};

const ProcessStep = ({ step, index, containerRef }) => {
  const stepRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start bottom", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-20, 0]);

  return (
    <motion.div 
      ref={stepRef}
      style={{ opacity, x }}
      className="flex flex-col md:flex-row gap-4 md:gap-12 py-12 border-b border-white/10 last:border-0"
    >
      <div className="heading-md text-gray">{step.num} — {step.title}</div>
      <div className="heading-md">{step.desc}</div>
    </motion.div>
  );
};

export default Process;
