import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TransitionEffect from '../components/TransitionEffect';
import AnimatedText from '../components/AnimatedText';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  return (
    <>
      <TransitionEffect />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-col"
        ref={containerRef}
      >
        <section className="min-h-screen pt-section-xs md:pt-section-sm px-page-xs md:px-page-sm lg:px-page-md xl:px-page-lg">
          <div className="max-w-6xl mx-auto">
            <AnimatedText 
              text="Let's Work Together" 
              className="mb-section-xs md:mb-section-sm text-display-sm md:text-display-md lg:text-display-lg xl:text-display-xl font-display font-bold" 
              tag="h1"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
              <motion.div style={{ y: y1 }}>
                <h2 className="text-heading-md md:text-heading-lg font-display font-bold mb-section-xs">Contact Information</h2>
                <ul className="space-y-4 md:space-y-6">
                  <li>
                    <span className="block text-xs md:text-sm text-light/60 mb-1">Email</span>
                    <a 
                      href="mailto:hello@example.com" 
                      className="link-hover text-lg md:text-xl"
                    >
                      hello@example.com
                    </a>
                  </li>
                  <li>
                    <span className="block text-xs md:text-sm text-light/60 mb-1">Location</span>
                    <span className="text-lg md:text-xl">New York, NY</span>
                  </li>
                  <li>
                    <span className="block text-xs md:text-sm text-light/60 mb-1">Social</span>
                    <div className="flex flex-wrap gap-4 md:gap-6">
                      <a 
                        href="https://www.instagram.com/hiwa_sadraden/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-hover"
                        data-cursor-text="Follow"
                      >
                        Instagram
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/hiwa-sadraldeen/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-hover"
                        data-cursor-text="Connect"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://github.com/HeewaDev" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-hover"
                        data-cursor-text="Code"
                      >
                        GitHub
                      </a>
                      <a 
                        href="https://www.facebook.com/hiwa.sadraden/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-hover"
                        data-cursor-text="Connect"
                      >
                        Facebook
                      </a>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div style={{ y: y2 }}>
                <h2 className="text-heading-md md:text-heading-lg font-display font-bold mb-section-xs">Send a Message</h2>
                <form className="space-y-6 md:space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-xs md:text-sm text-light/60 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-transparent border-b border-light/30 py-2 text-sm md:text-base focus:outline-none focus:border-light transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs md:text-sm text-light/60 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-transparent border-b border-light/30 py-2 text-sm md:text-base focus:outline-none focus:border-light transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs md:text-sm text-light/60 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full bg-transparent border-b border-light/30 py-2 text-sm md:text-base focus:outline-none focus:border-light transition-colors resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <button 
                      type="submit" 
                      className="link-hover text-lg md:text-xl py-3 md:py-4 px-6 md:px-8 border border-light/30 rounded-full hover:bg-light hover:text-dark transition-colors duration-300 w-full md:w-auto"
                      data-cursor-text="Send"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
};

export default Contact;