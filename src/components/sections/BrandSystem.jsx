import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const elements = [
  'LOGO', '+', 'COLOR', '+', 'TYPE', '+', 'IMAGERY', '+', 'MOTION', '+', 'SOCIAL', '+', 'WEB'
];

const BrandSystem = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });

      tl.from('.equation-item', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

      tl.fromTo('.equation-result', 
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "+=0.2"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="brand-system-section section-padding bg-charcoal">
      <div className="container text-center">
        
        <p className="label-sm text-gray mb-12">THE PRESSENTER FORMULA</p>

        <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto mb-16">
          {elements.map((item, index) => (
            <div 
              key={index} 
              className={`equation-item heading-md ${item === '+' ? 'text-gray opacity-50' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="equation-result">
          <div className="text-gray text-4xl mb-4">=</div>
          <h2 className="heading-massive text-accent">BRAND</h2>
        </div>

      </div>
    </section>
  );
};

export default BrandSystem;
