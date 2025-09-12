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
  const isVerySmallMobile = window.innerWidth < 480;
  
  // Total duration of all transition animations - mobile optimized
  const totalDuration = isMobile ? 2000 : 4000;
  
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
    // Mobile-optimized timing - much faster transitions for better UX
    const isMobile = window.innerWidth < 768;
    const textDelay = isMobile ? 400 : 1000; // Much faster on mobile
    const hideDelay = isMobile ? 1200 : 2800; // Much earlier hide on mobile
    const exitDelay = isMobile ? 1400 : 3000; // Much earlier exit on mobile

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
    }, totalDuration);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(hideTextTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [setAnimationReady, totalDuration]);

  const pageName = getPageName();

  // Skip transition on very small mobile devices for better performance
  if (isVerySmallMobile) {
    if (setAnimationReady) {
      setTimeout(() => setAnimationReady(true), 100);
    }
    return null;
  }

  return (
    <>
      {/* Single White Background - Mobile Optimized */}
      <motion.div 
        className="fixed inset-0 w-screen h-screen z-40 flex items-center justify-center"
        style={{ 
          backgroundColor: "#ffffff",
          pointerEvents: "none" // Don't block touch events on mobile
        }}
        initial={{ y: "100%" }} // Start completely below screen
        animate={
          startExit 
            ? { y: "-100%" } // Exit completely above screen
            : { y: "0%" }    // Cover the screen completely
        }
        transition={{ 
          duration: startExit ? (window.innerWidth < 768 ? 0.8 : 1.2) : (window.innerWidth < 768 ? 0.4 : 0.6), // Much faster on mobile
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
            duration: window.innerWidth < 768 ? 0.3 : 0.6, // Faster on mobile
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