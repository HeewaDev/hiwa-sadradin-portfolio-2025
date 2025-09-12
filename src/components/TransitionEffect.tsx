import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface TransitionEffectProps {
  setAnimationReady?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransitionEffect: React.FC<TransitionEffectProps> = ({ setAnimationReady }) => {
  const location = useLocation();
  
  // Check if device is mobile
  const isMobile = window.innerWidth < 768;
  
  // Total duration of all transition animations
  const totalDuration = 4000;
  
  // Animation states
  const [showText, setShowText] = useState(false);
  const [startExit, setStartExit] = useState(false);

  // Get page name based on current route
  const getPageName = () => {
    switch (location.pathname) {
      case '/':
        return 'HOME';
      case '/about':
        return 'ABOUT';
      case '/projects':
        return 'PROJECTS';
      case '/blog':
        return 'BLOG';
      case '/contact':
        return 'CONTACT';
      default:
        return 'HIWA SADRADIN';
    }
  };

  useEffect(() => {
    // Mobile-optimized timing - slightly faster transitions for better UX
    const isMobile = window.innerWidth < 768;
    const textDelay = isMobile ? 800 : 1000; // Slightly faster on mobile
    const hideDelay = isMobile ? 2400 : 2800; // Slightly earlier hide on mobile
    const exitDelay = isMobile ? 2600 : 3000; // Slightly earlier exit on mobile

    // Show text AFTER slide-in completes (not during)
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, textDelay);

    // Hide text before exit starts
    const hideTextTimer = setTimeout(() => {
      setShowText(false);
    }, hideDelay);

    // Start exit animation after text disappears
    const exitTimer = setTimeout(() => {
      setStartExit(true);
    }, exitDelay);

    // Set animation ready after all transitions complete
    const completeTimer = setTimeout(() => {
      if (setAnimationReady) {
        setAnimationReady(true);
      }
      // Ensure scroll is enabled after transition
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }, totalDuration);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTextTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      // Ensure scroll is always restored on cleanup
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, [setAnimationReady, totalDuration]);

  // Cleanup effect to ensure scroll is restored when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);

  const pageName = getPageName();

  return (
    <>
      {/* Single White Background - Mobile Optimized */}
      <motion.div 
        className="fixed inset-0 w-screen h-screen z-40 flex items-center justify-center"
        style={{ 
          backgroundColor: "#ffffff",
          pointerEvents: startExit ? "none" : "auto" // Only block during transition, allow after
        }}
        initial={{ y: "100%" }} // Start completely below screen
        animate={
          startExit 
            ? { y: "-100%" } // Exit completely above screen
            : { y: "0%" }    // Cover the screen completely
        }
        transition={{ 
          duration: startExit ? 1.2 : 0.6, // Keep original timing
          ease: "easeInOut"
        }}
      >
        {/* Centered Text - Mobile Responsive */}
        <motion.div
          className="text-center px-4 md:px-8 pointer-events-none"
          style={{ pointerEvents: "none" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showText ? 1 : 0, 
            y: showText ? 0 : 20 
          }}
          transition={{ 
            duration: 0.6, // Keep original timing
            ease: "easeOut" 
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display font-bold text-black leading-none tracking-tight text-center break-words">
            {pageName}
          </h1>
          {location.pathname === '/' && (
            <motion.div
              className="mt-4 md:mt-6 lg:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: showText ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold text-black/70 tracking-wider text-center">
                ©2025
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default TransitionEffect;