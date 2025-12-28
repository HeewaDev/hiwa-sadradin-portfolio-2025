import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStep(1), 600);
    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="relative w-full bg-white min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-page-xs md:px-page-sm lg:px-page-md xl:px-page-lg py-section-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="lg:col-span-6 space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationStep >= 1 ? 1 : 0, y: animationStep >= 1 ? 0 : 20 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-1"
            >
              <h1 className="text-display-md md:text-display-lg lg:text-display-xl xl:text-display-2xl font-light text-black leading-none tracking-tight">
                HIWA SADRADIN
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationStep >= 1 ? 1 : 0, y: animationStep >= 1 ? 0 : 20 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-heading-md md:text-heading-lg text-gray-500 font-normal tracking-wide mb-4">
                  Full Stack Developer
                </h2>
                <div className="w-12 h-px bg-black mb-6"></div>
              </div>
              
              <p className="text-body-lg md:text-body-xl text-gray-600 leading-relaxed max-w-lg">
                Building robust full-stack applications with React.js, Node.js, and advanced database solutions. Specialized in operational dashboards, CMS platforms, and custom web applications.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: animationStep >= 1 ? 1 : 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="relative w-full max-w-[280px] md:max-w-[420px] aspect-[4/5]"
            >
              <img 
                src="/Hiwa Sadradin.jpg"
                alt="Hiwa Sadradin"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;