import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/splash/SplashScreen';
import BentoGrid from './components/modular/BentoGrid';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <SplashScreen 
            key="splash"
            onEnter={() => setHasEntered(true)} 
          />
        ) : (
          <BentoGrid 
            key="bento"
            onResetSplash={() => setHasEntered(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
