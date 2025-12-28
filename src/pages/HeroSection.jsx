import React from 'react';

const HeroSection = () => {

  return (
    <div className="relative w-full bg-white min-h-screen flex items-center z-10">
      <div className="w-full max-w-7xl mx-auto px-page-xs md:px-page-sm lg:px-page-md xl:px-page-lg py-section-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="lg:col-span-6 space-y-8 md:space-y-10">
            <div className="space-y-1">
              <h1 className="text-display-md md:text-display-lg lg:text-display-xl xl:text-display-2xl font-light text-black leading-none tracking-tight">
                HIWA SADRADIN
              </h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-heading-md md:text-heading-lg text-gray-700 font-normal tracking-wide mb-4">
                  Full Stack Developer
                </h2>
                <div className="w-12 h-px bg-black mb-6"></div>
              </div>
              
              <p className="text-body-lg md:text-body-xl text-gray-700 leading-relaxed max-w-lg">
                Building robust full-stack applications with React.js, Node.js, and advanced database solutions. Specialized in operational dashboards, CMS platforms, and custom web applications.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] md:max-w-[420px] aspect-[4/5]">
              <img 
                src="/Hiwa Sadradin.jpg"
                alt="Hiwa Sadradin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;