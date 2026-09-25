import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/splash/SplashScreen';
import CinematicExperience from './components/cinematic/CinematicExperience';
import ParticleCanvas from './components/modular/ParticleCanvas';
import CustomCursor from './components/common/CustomCursor';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="app-container">
      {/* High-Tech Custom Magnetic Fluid Cursor */}
      <CustomCursor />

      {/* Cyber Particle Laser Canvas Background */}
      <ParticleCanvas />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <SplashScreen 
            key="splash"
            onEnter={() => setHasEntered(true)} 
          />
        ) : (
          <CinematicExperience 
            key="cinematic"
            onResetSplash={() => setHasEntered(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
