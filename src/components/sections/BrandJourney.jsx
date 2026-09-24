import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BrandJourney.css';

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  { id: '01', title: 'IDEA', description: 'Understanding the core business, audience, and goals.' },
  { id: '02', title: 'IDENTITY', description: 'Crafting the logo, typography, and visual language.' },
  { id: '03', title: 'CONTENT', description: 'Producing video, photography, and motion graphics.' },
  { id: '04', title: 'DIGITAL', description: 'Building the website and digital experiences.' },
  { id: '05', title: 'LAUNCH', description: 'Bringing everything together for the world to see.' },
  { id: '06', title: 'GROW', description: 'Managing social media and continuous campaigns.' }
];

const BrandJourney = () => {
  const containerRef = useRef(null);
  const visualsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Pin the visuals on the right while scrolling through steps on the left
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: visualsRef.current,
        scrub: true
      });

      // Animate active states of steps based on scroll
      const steps = gsap.utils.toArray('.journey-step');
      const visuals = gsap.utils.toArray('.journey-visual-item');

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => activateStep(i),
          onEnterBack: () => activateStep(i),
        });
      });

      function activateStep(index) {
        steps.forEach((s, i) => {
          if (i === index) {
            s.classList.add('active');
            gsap.to(visuals[i], { opacity: 1, scale: 1, zIndex: 10, duration: 0.5 });
          } else {
            s.classList.remove('active');
            gsap.to(visuals[i], { opacity: 0, scale: 0.95, zIndex: 1, duration: 0.5 });
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="journey-section relative">
      <div className="container">
        
        <div className="journey-layout">
          
          {/* Left side: Scrolling Steps */}
          <div className="journey-steps-container">
            <h2 className="heading-lg mb-16">
              From Idea to <br/>
              <span className="text-editorial text-gray">Complete Brand.</span>
            </h2>

            <div className="journey-steps">
              {journeySteps.map((step) => (
                <div key={step.id} className="journey-step">
                  <div className="step-number label-sm">{step.id}</div>
                  <h3 className="heading-md mt-4">{step.title}</h3>
                  <p className="body-md text-gray mt-2">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Sticky Visuals */}
          <div className="journey-visuals-container" ref={visualsRef}>
            <div className="journey-visuals-wrapper glass">
              
              {/* 01 IDEA */}
              <div className="journey-visual-item flex items-center justify-center absolute inset-0">
                <div className="text-gray text-editorial text-2xl opacity-50">rough sketch...</div>
              </div>

              {/* 02 IDENTITY */}
              <div className="journey-visual-item flex items-center justify-center absolute inset-0 opacity-0">
                <div className="font-editorial text-accent" style={{ fontSize: '8rem' }}>PE</div>
              </div>

              {/* 03 CONTENT */}
              <div className="journey-visual-item flex items-center justify-center absolute inset-0 opacity-0">
                <div className="grid grid-cols-2 gap-4 w-3/4 h-3/4">
                  <div className="bg-gray-800 rounded-md"></div>
                  <div className="bg-gray-700 rounded-md"></div>
                  <div className="bg-gray-900 rounded-md col-span-2"></div>
                </div>
              </div>

              {/* 04 DIGITAL */}
              <div className="journey-visual-item flex items-center justify-center absolute inset-0 opacity-0">
                <div className="w-3/4 h-3/4 border-2 border-accent rounded-lg flex flex-col">
                  <div className="h-8 border-b-2 border-accent w-full"></div>
                  <div className="flex-1 bg-accent bg-opacity-10"></div>
                </div>
              </div>

              {/* 05 LAUNCH */}
              <div className="journey-visual-item flex items-center justify-center absolute inset-0 opacity-0">
                <div className="text-accent text-3xl font-bold tracking-widest text-center">
                  PRESSENTER<br/>
                  <span className="text-sm font-normal text-white">LIVE</span>
                </div>
              </div>

              {/* 06 GROW */}
              <div className="journey-visual-item flex items-center justify-center absolute inset-0 opacity-0">
                <div className="flex gap-4 items-end h-1/2 w-1/2 justify-center">
                  <div className="w-8 bg-accent h-1/4 rounded-t-sm"></div>
                  <div className="w-8 bg-accent h-2/4 rounded-t-sm"></div>
                  <div className="w-8 bg-accent h-3/4 rounded-t-sm"></div>
                  <div className="w-8 bg-accent h-full rounded-t-sm"></div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BrandJourney;
