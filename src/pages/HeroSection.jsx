import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Simple animation sequence
    const timer1 = setTimeout(() => setAnimationStep(1), 500);
    const timer2 = setTimeout(() => setAnimationStep(2), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: 'calc(100vh + 200px)' }}>
      {/* Professional CSS Animations */}
      <style jsx>{`
        @keyframes slideUpFromBelow {
          from {
            transform: translate3d(0, 100px, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }
        
        .char {
          display: inline-block;
          will-change: transform, opacity;
          animation: slideUpFromBelow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .hero-image-container {
          will-change: transform;
          transform: translateZ(0);
        }
        
        .hero-image {
          will-change: transform;
          transform: translateZ(0);
        }
      `}</style>

      {/* Professional Layout Grid */}
      <div className="h-full grid grid-cols-12 gap-8 px-6 md:px-12 lg:px-24 py-16">
        
        {/* Left Column - Name and Title */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <div className="space-y-8">
            {/* Name Section */}
            <div 
              className={`transition-all duration-[1200ms] ${
                animationStep >= 1 ? '-translate-y-4' : 'translate-y-0'
              }`}
              style={{
                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                animation: 'slideUpFromBelow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                opacity: 0,
              }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-none tracking-tight">
                HIWA
              </h1>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black leading-none tracking-tight">
                SADRADIN
              </h1>
            </div>

            {/* Professional Title */}
            <div 
              className={`transition-all duration-[1200ms] ${
                animationStep >= 1 ? 'translate-y-4' : 'translate-y-0'
              }`}
              style={{
                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transitionDelay: '100ms',
                animation: 'slideUpFromBelow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards',
                opacity: 0,
              }}
            >
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-medium text-gray-600 tracking-wide">
                  FULL STACK DEVELOPER
                </h2>
                <div className="w-24 h-1 bg-black"></div>
                <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                  Crafting digital experiences through innovative code and thoughtful design.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="col-span-12 lg:col-span-7 flex items-center justify-center">
          <div 
            className="relative overflow-hidden rounded-2xl"
            style={{
              width: animationStep >= 1 ? '500px' : '0px',
              height: animationStep >= 1 ? '600px' : '0px',
              transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transitionDelay: '200ms',
            }}
          >
            <img 
              src="/Hiwa Sadradin.jpg"
              alt="Hiwa Sadradin"
              className="w-full h-full object-cover hero-image"
              style={{
                opacity: animationStep >= 1 ? 1 : 0,
                transition: 'opacity 1s ease-out',
                transitionDelay: '600ms'
              }}
            />
            
            {/* Professional overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              style={{
                opacity: animationStep >= 1 ? 1 : 0,
                transition: 'opacity 1s ease-out',
                transitionDelay: '800ms'
              }}
            />
          </div>
        </div>
      </div>



      {/* Professional Footer Elements */}
      <div 
        className={`absolute bottom-8 right-8 z-20 transition-all duration-[1000ms] ${
          animationStep >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-70'
        }`}
        style={{
          transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transitionDelay: '1s'
        }}
      >
        <div className="text-black animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;