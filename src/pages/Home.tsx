/*
  CURSOR INTEGRATION READY!
  
  This Home component is now set up to work with the magnetic cursor component.
  Interactive elements include:
  
  - .magnetic-link (with data-cursor-text): Links with custom cursor text
  - .interactive (with data-cursor-text): Cards and sections with hover effects
  - All buttons and links: Automatic cursor enhancement
  
  To use:
  1. Import and include the Cursor component in your App.js
  2. Track mouse position and pass x,y coordinates to Cursor
  3. The cursor will automatically detect and interact with elements
*/

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus, Minus } from 'lucide-react';
import HeroSection from '../pages/HeroSection'; // Import the separate HeroSection component

const skillCategories = [
  {
    id: 1,
    title: "Frontend",
    description: "I specialize in creating modern, responsive user interfaces using React.js, TypeScript, and advanced CSS techniques. My expertise includes state management with Redux, component architecture, and performance optimization for seamless user experiences.",
    skills: ["React.js & Next.js", "UI Component Libraries", "Responsive Interfaces", "Interactive Dashboards", "TypeScript", "Redux", "CSS3", "HTML5"]
  },
  {
    id: 2,
    title: "Backend",
    description: "I build robust server-side applications and APIs using Node.js, Express.js, and NestJS. My backend expertise includes database design, API development, authentication systems, and microservices architecture for scalable applications.",
    skills: ["Node.js & Express.js", "RESTful API Design", "Database Architecture", "Microservices", "NestJS", "MySQL", "MongoDB", "PostgreSQL"]
  },
  {
    id: 3,
    title: "Data",
    description: "I work with data analysis, visualization, and management using Python libraries and database systems. My data expertise includes ETL processes, data visualization, and database optimization for business intelligence.",
    skills: ["Python Data Analysis", "Database Management", "Data Visualization", "ETL Processes", "NumPy", "Pandas", "Matplotlib", "PyTorch"]
  }
];

const Home = () => {
  // Portfolio scroll effects
  const containerRef = useRef(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(1); // Start with Frontend expanded



  return (
    <div className="relative">
      {/* HERO SECTION - Imported component */}
      <HeroSection />

      {/* PORTFOLIO CONTENT - Below the hero */}
      <motion.main
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex flex-col relative z-10"
      >
        {/* Crafting Digital Experiences Section */}
        <section className="min-h-screen md:min-h-[120vh] flex flex-col justify-center px-4 md:px-6 lg:px-12 xl:px-24 relative overflow-hidden bg-black text-white py-16 md:py-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] pointer-events-none opacity-10"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)"
            }}
          />

          <div className="max-w-6xl mx-auto w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-xl text-white/60 font-display tracking-wider">Software Developer</span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white interactive"
                data-cursor-text="DIGITAL"
              >
                Crafting Digital
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-12">
              <motion.h1
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white interactive"
                data-cursor-text="EXPERIENCES"
              >
                Experiences
              </motion.h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <motion.p
                className="text-xl text-white/80 leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I build robust full-stack applications using React.js, Node.js, and advanced database solutions. Specialized in developing operational dashboards, CMS platforms, and custom web applications with optimized database architectures.
              </motion.p>

              <motion.div
                className="flex flex-col space-y-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <a
                  href="/projects"
                  className="group flex items-center space-x-4 text-2xl font-display text-white hover:text-white/70 transition-colors magnetic-link"
                  data-cursor-text="VIEW"
                >
                  <span>View Projects</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="/contact"
                  className="group flex items-center space-x-4 text-2xl font-display text-white hover:text-white/70 transition-colors magnetic-link"
                  data-cursor-text="CONTACT"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full Stack Developer Skills - Accordion Style */}
        <section className="py-16 md:py-32 lg:py-40 px-4 md:px-6 lg:px-12 xl:px-24 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-left mb-12 md:mb-20"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-black leading-none tracking-tight">
                  SKILLS
              </h2>
            </motion.div>

            {/* Accordion Component */}
              <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-0"
            >
              {skillCategories.map((category, index) => (
                <motion.div 
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    onClick={() => setExpandedItem(expandedItem === category.id ? null : category.id)}
                    className="w-full py-4 md:py-8 px-0 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                    data-cursor-text="Expand"
                  >
                    <div className="flex items-center gap-4 md:gap-8">
                      <span className="text-gray-400 text-lg md:text-xl font-mono">
                        {String(category.id).padStart(2, '0')}
                      </span>
                      <h3 className={`text-xl md:text-2xl lg:text-3xl font-display font-bold transition-colors duration-300 ${
                        expandedItem === category.id ? 'text-black' : 'text-gray-600'
                      }`}>
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="text-gray-400">
                      {expandedItem === category.id ? (
                        <Minus className="w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <Plus className="w-5 h-5 md:w-6 md:h-6" />
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
                        <div className="pb-6 md:pb-8 pl-8 md:pl-20">
                          <p className="text-gray-700 leading-relaxed mb-4 md:mb-8 text-sm md:text-lg max-w-4xl">
                            {category.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 md:gap-3">
                            {category.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full border border-gray-200 font-medium"
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
              </motion.div>
          </div>
        </section>

        {/* Latest Blog Posts Section */}
        <section className="py-16 md:py-32 lg:py-40 px-4 md:px-6 lg:px-12 xl:px-24 bg-black text-white">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
              <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-none tracking-tight mb-4">
                LATEST POSTS
              </h2>
              <div className="w-12 md:w-16 h-0.5 bg-white mb-4 md:mb-6"></div>
                  </motion.div>
                  
            {/* Blog Posts List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Blog Post 1 */}
              <motion.article
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group cursor-pointer border-b border-gray-800 pb-8 hover:border-gray-600 transition-colors duration-300 magnetic-link"
                data-cursor-text="READ"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>Dec 15, 2024</span>
                      <span>•</span>
                      <span>5 min read</span>
                      <span>•</span>
                      <span className="text-blue-400">React</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-medium text-white mb-2 group-hover:text-gray-300 transition-colors">
                      Building Scalable React Applications
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      Learn how to structure your React applications for maximum scalability and maintainability in modern web development.
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-start pt-2">
                    <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Blog Post 2 */}
              <motion.article
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group cursor-pointer border-b border-gray-800 pb-8 hover:border-gray-600 transition-colors duration-300 magnetic-link"
                data-cursor-text="READ"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>Dec 10, 2024</span>
                      <span>•</span>
                      <span>7 min read</span>
                      <span>•</span>
                      <span className="text-green-400">Node.js</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-medium text-white mb-2 group-hover:text-gray-300 transition-colors">
                      Microservices Architecture with Node.js
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      A comprehensive guide to building microservices using Node.js and modern deployment strategies for scalable applications.
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-start pt-2">
                    <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Blog Post 3 */}
              <motion.article
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group cursor-pointer border-b border-gray-800 pb-8 hover:border-gray-600 transition-colors duration-300 magnetic-link"
                data-cursor-text="READ"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>Dec 5, 2024</span>
                      <span>•</span>
                      <span>4 min read</span>
                      <span>•</span>
                      <span className="text-orange-400">CSS</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-medium text-white mb-2 group-hover:text-gray-300 transition-colors">
                      Modern CSS Techniques for 2025
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      Explore the latest CSS features and techniques that will define web design in 2025 and beyond.
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-start pt-2">
                    <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Blog Post 4 */}
              <motion.article
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group cursor-pointer border-b border-gray-800 pb-8 hover:border-gray-600 transition-colors duration-300 magnetic-link"
                data-cursor-text="READ"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>Nov 28, 2024</span>
                      <span>•</span>
                      <span>6 min read</span>
                      <span>•</span>
                      <span className="text-purple-400">AI</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-medium text-white mb-2 group-hover:text-gray-300 transition-colors">
                      AI Integration in Web Development
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      How artificial intelligence is revolutionizing the way we build and interact with web applications.
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-start pt-2">
                    <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.article>

              {/* Blog Post 5 */}
              <motion.article
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group cursor-pointer hover:border-gray-600 transition-colors duration-300 magnetic-link"
                data-cursor-text="READ"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>Nov 20, 2024</span>
                      <span>•</span>
                      <span>8 min read</span>
                      <span>•</span>
                      <span className="text-indigo-400">Career</span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-display font-medium text-white mb-2 group-hover:text-gray-300 transition-colors">
                      From Junior to Senior Developer: My Journey
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                      A personal reflection on the challenges, lessons learned, and key milestones in becoming a senior developer.
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-start pt-2">
                    <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
            </div>
              </motion.article>
          </motion.div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16"
            >
              <a
                href="/blog"
                className="inline-flex items-center text-white border border-gray-600 px-6 py-3 text-sm font-medium hover:border-white hover:bg-white hover:text-black transition-all duration-300 magnetic-link"
                data-cursor-text="EXPLORE"
              >
                <span>View All Posts</span>
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          className="py-16 md:py-32 lg:py-40 px-4 md:px-6 lg:px-12 xl:px-24" 
          style={{ 
            backgroundColor: '#c4bdb3'
          }}
        >
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-black interactive" data-cursor-text="PROJECT">
                  Ready to start your project?
                </h2>
              </div>
              
              <div>
                <p className="text-lg md:text-xl mb-8 text-neutral-900">
                  Let's collaborate to create something extraordinary that exceeds expectations.
                </p>
                
                <a
                  href="/contact"
                  className="inline-flex items-center bg-black text-white border-0 px-8 py-4 text-base font-medium hover:bg-gray-800 transition-colors magnetic-link"
                  data-cursor-text="CONTACT"
                >
                  <span>Contact Me</span>
                  <ArrowRight size={16} className="ml-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
};

export default Home;