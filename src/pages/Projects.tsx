import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import TransitionEffect from '../components/TransitionEffect';
import AnimatedText from '../components/AnimatedText';

interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  company: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with React and Node.js. Implemented real-time inventory management, payment processing, and an intuitive admin dashboard.",
    role: "Lead Frontend Developer",
    company: "TechCorp Inc.",
    image: "https://images.pexels.com/photos/18069362/pexels-photo-18069362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    link: "https://example.com",
    github: "https://github.com"
  },
  {
    id: 2,
    title: "Financial Dashboard",
    description: "A comprehensive financial dashboard providing real-time market data, portfolio management, and advanced analytics for institutional investors.",
    role: "Frontend Developer",
    company: "FinTech Solutions",
    image: "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "TypeScript", "D3.js", "WebSocket", "Redux"],
    link: "https://example.com"
  },
  {
    id: 3,
    title: "Social Media Analytics",
    description: "An analytics platform that helps businesses track and analyze their social media performance across multiple platforms with AI-powered insights.",
    role: "UI/UX Developer",
    company: "Social Analytics Co.",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "AWS"],
    github: "https://github.com"
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <TransitionEffect />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-col min-h-screen"
      >
        <section className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <AnimatedText 
              text="Collaborative Projects" 
              className="mb-8 text-5xl md:text-7xl font-display font-bold" 
              tag="h1"
            />
            
            <motion.p 
              className="text-xl text-light/80 leading-relaxed max-w-2xl mb-24"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              A collection of projects I've collaborated on with talented teams, pushing the boundaries of digital experiences.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-none"
                  onClick={() => setSelectedProject(project)}
                  data-cursor-text="View"
                >
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">{project.title}</h3>
                  <p className="text-light/60">{project.company}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/90 z-50 overflow-y-auto"
            >
              <div className="min-h-screen px-6 md:px-12 lg:px-24 py-24">
                <div className="max-w-6xl mx-auto relative">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute -top-12 right-0 link-hover"
                    data-cursor-text="Close"
                  >
                    <X className="w-8 h-8" />
                  </button>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="rounded-lg overflow-hidden mb-12 aspect-video">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="md:col-span-2">
                        <h2 className="text-4xl font-display font-bold mb-6">{selectedProject.title}</h2>
                        <p className="text-xl text-light/80 leading-relaxed mb-8">{selectedProject.description}</p>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-4 py-2 rounded-full border border-light/20 text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <h3 className="text-light/60 uppercase tracking-wider text-sm mb-2">Role</h3>
                          <p className="text-xl">{selectedProject.role}</p>
                        </div>
                        <div>
                          <h3 className="text-light/60 uppercase tracking-wider text-sm mb-2">Company</h3>
                          <p className="text-xl">{selectedProject.company}</p>
                        </div>
                        <div className="flex gap-6">
                          {selectedProject.link && (
                            <a 
                              href={selectedProject.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-hover flex items-center gap-2"
                              data-cursor-text="Visit"
                            >
                              <ExternalLink className="w-5 h-5" />
                              <span>Visit Site</span>
                            </a>
                          )}
                          {selectedProject.github && (
                            <a 
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-hover flex items-center gap-2"
                              data-cursor-text="Code"
                            >
                              <Github className="w-5 h-5" />
                              <span>View Code</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
};

export default Projects;