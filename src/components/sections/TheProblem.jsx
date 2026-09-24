import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TheProblem.css';

gsap.registerPlugin(ScrollTrigger);

const TheProblem = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the problem section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });

      // Animate the scattered elements coming together
      tl.to('.problem-item', {
        y: 0,
        x: 0,
        opacity: 0,
        scale: 0.5,
        stagger: 0.1,
        duration: 1
      }, 0);

      // Fade in the solution text as the items disappear
      tl.fromTo('.solution-text', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 },
        0.5
      );

    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section ref={containerRef} className="problem-section section-padding relative">
      <div className="container h-full flex flex-col justify-center items-center text-center">
        
        <h2 className="heading-lg max-w-4xl mx-auto mb-24 problem-heading">
          Building a brand shouldn't require <br />
          <span className="text-editorial">ten different people.</span>
        </h2>

        <div className="problem-visualization relative w-full h-[60vh] min-h-[400px] flex items-center justify-center">
          
          {/* Scattered Elements */}
          <div className="problem-item glass absolute top-0 left-10 p-4 rounded-full">Logo Designer</div>
          <div className="problem-item glass absolute top-20 right-20 p-4 rounded-full">Web Developer</div>
          <div className="problem-item glass absolute bottom-10 left-20 p-4 rounded-full">Video Editor</div>
          <div className="problem-item glass absolute bottom-30 right-10 p-4 rounded-full">Social Media Manager</div>
          <div className="problem-item glass absolute top-1/2 left-0 p-4 rounded-full">Graphic Designer</div>
          <div className="problem-item glass absolute top-1/2 right-0 p-4 rounded-full">Copywriter</div>

          {/* Plus signs representing fragmentation */}
          <div className="problem-item text-gray text-2xl absolute top-10 left-1/3">+</div>
          <div className="problem-item text-gray text-2xl absolute bottom-20 right-1/3">+</div>
          <div className="problem-item text-gray text-2xl absolute top-1/2 left-1/4">+</div>
          <div className="problem-item text-gray text-2xl absolute top-1/2 right-1/4">+</div>

          {/* Solution Text */}
          <div className="solution-text absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="heading-massive text-accent">PRESSENTER</h1>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TheProblem;
