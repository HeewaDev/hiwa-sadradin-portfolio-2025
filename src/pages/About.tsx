import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransitionEffect from '../components/TransitionEffect';
import AnimatedText from '../components/AnimatedText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    id: 1,
    title: "Frontend",
    description: "I specialize in creating modern, responsive user interfaces using React.js, TypeScript, and advanced CSS techniques. My expertise includes state management with Redux, component architecture, and performance optimization for seamless user experiences.",
    skills: ["React.js", "TypeScript", "Redux", "CSS3", "HTML5", "JavaScript", "Responsive Design", "Performance Optimization"]
  },
  {
    id: 2,
    title: "Backend",
    description: "I build robust server-side applications and APIs using Node.js, Express.js, and NestJS. My backend expertise includes database design, API development, authentication systems, and microservices architecture for scalable applications.",
    skills: ["Node.js", "Express.js", "NestJS", "MySQL", "MongoDB", "PostgreSQL", "API Development", "Authentication", "Microservices"]
  }
];

const About: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(1); // Start with Frontend expanded
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Check for mobile viewport on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    // Handle animations differently based on screen size
    if (window.innerWidth < 768) {
      // Simplified animations for mobile
      gsap.utils.toArray('.animate-p').forEach((elem: any) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out"
          }
        );
      });
    } else {
      // More sophisticated scroll animations for desktop
      const paragraphs = document.querySelectorAll('.animate-p');
      
      paragraphs.forEach((paragraph) => {
        gsap.fromTo(
          paragraph,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: paragraph,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }

    // Add responsive handling for animations
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isMobile]);
  
  return (
    <>
      <TransitionEffect />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: isMobile ? 0.4 : 0.8 }}
        className="flex flex-col w-full overflow-hidden"
      >
        <section className="min-h-screen pt-section-xs py-section-xs px-page-xs md:pt-section-sm md:py-section-sm md:px-page-sm lg:px-page-md xl:px-page-lg">
          <div className="w-full max-w-6xl mx-auto">
            <AnimatedText 
              text="About Me" 
              className="mb-section-xs md:mb-section-sm text-display-sm md:text-display-lg lg:text-display-xl font-display font-bold text-center" 
              tag="h1"
            />
            
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6 lg:gap-12 xl:gap-16">
              {/* Skills Accordion section - Appears first on mobile */}
              <div className="w-full mb-10 md:mb-0 md:order-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  ref={targetRef}
                >
                  <h2 className="text-heading-md md:text-heading-lg font-display font-bold mb-section-xs md:mb-section-sm text-center md:text-left">Expertise</h2>
                  
                  {/* Accordion Component */}
                  <div className="space-y-0">
                    {skillCategories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                        className="border-b border-light/20 last:border-b-0"
                      >
                        <button
                          onClick={() => setExpandedItem(expandedItem === category.id ? null : category.id)}
                          className="w-full py-6 px-0 text-left flex items-center justify-between hover:bg-light/5 transition-colors duration-300"
                          data-cursor-text="Expand"
                        >
                          <div className="flex items-center gap-6">
                            <span className="text-light/40 text-lg font-mono">
                              {String(category.id).padStart(2, '0')}
                            </span>
                            <h3 className={`text-xl sm:text-2xl font-display font-bold transition-colors duration-300 ${
                              expandedItem === category.id ? 'text-light' : 'text-light/60'
                            }`}>
                              {category.title}
                            </h3>
                          </div>
                          
                          <div className="text-light/40">
                            {expandedItem === category.id ? (
                              <Minus className="w-5 h-5" />
                            ) : (
                              <Plus className="w-5 h-5" />
                            )}
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedItem === category.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pb-6 pl-16">
                                <p className="text-light/80 leading-relaxed mb-6 text-sm sm:text-base">
                                  {category.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">
                                  {category.skills.map((skill, skillIndex) => (
                                    <span
                                      key={skillIndex}
                                      className="px-3 py-1 bg-light/10 text-light/70 text-xs rounded-full border border-light/20"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              {/* About text - Appears second on mobile */}
              <div className="w-full md:order-1">
                <p className="text-body-md md:text-body-lg text-light/80 leading-relaxed mb-4 md:mb-6 animate-p" ref={paragraphRef}>
                  I am a Full-Stack Developer and Project Manager at Xcreative, where I leverage my expertise in both frontend and backend technologies to develop efficient, scalable web applications and manage project workflows. With a comprehensive technical skillset, I specialize in creating robust solutions that meet business requirements and enhance user experience.
                </p>
                <p className="text-body-md md:text-body-lg text-light/80 leading-relaxed mb-4 md:mb-6 animate-p">
                  My background includes previous experience at Lezzoo where I built operational dashboards and CMS platforms, as well as freelance development creating custom web applications and APIs with a focus on seamless integration and performance optimization. I'm passionate about delivering high-quality solutions that drive business value and enhance operational efficiency.
                </p>
                <p className="text-body-md md:text-body-lg text-light/80 leading-relaxed animate-p">
                  I hold a Bachelor's degree in Computer Science from Knowledge University (2020-2024) and a Diploma in Information Technology from EPU (2018-2020). Beyond my core development skills, I'm also passionate about data science and visualization, working with Python libraries like NumPy, Pandas, Matplotlib, and PyTorch.
                </p>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
};

export default About;