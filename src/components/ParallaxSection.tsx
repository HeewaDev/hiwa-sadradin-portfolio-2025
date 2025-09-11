import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Digital Experience",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "UX/UI Design"
  },
  {
    id: 2,
    title: "Brand Identity",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Branding"
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    image: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Development"
  },
  {
    id: 4,
    title: "Mobile Application",
    image: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "App Design"
  }
];

const ParallaxSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1
        }
      }
    );
    
    return () => {
      pin.scrollTrigger?.kill();
    };
  }, []);
  
  return (
    <section ref={triggerRef} className="h-screen w-screen overflow-hidden">
      <div ref={sectionRef} className="horizontal-scroll-container h-screen">
        {projects.map((project) => (
          <div key={project.id} className="horizontal-scroll-section px-8 md:px-16">
            <div className="max-w-2xl">
              <div className="mb-4 text-sm uppercase tracking-widest">{project.category}</div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">{project.title}</h2>
              <div className="project-card aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-image"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxSection;