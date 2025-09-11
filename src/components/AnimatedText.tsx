import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import SplitType from 'split-type';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number; // Added delay prop to sync with TransitionEffect
  transitionComplete?: boolean; // Flag to start animation only after transition is complete
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  once = true, 
  tag = 'h2',
  delay = 0,
  transitionComplete = true // Default to true if not being synced with a transition
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(containerRef, { once });
  const textRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    // Only start animation when both in view and transition is complete
    if (inView && transitionComplete) {
      // Additional delay after transition completes
      const timer = setTimeout(() => {
        controls.start("visible");
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [controls, inView, transitionComplete, delay]);
  
  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current.children[0];
      if (element) {
        textRef.current = element as HTMLElement;
        // Use SplitType to split text into characters for animation
        new SplitType(element, { types: 'chars, words' });
      }
    }
  }, [text]); // Re-run when text changes
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const TagComponent = tag;

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className={className}
      >
        <TagComponent className="inline-block">
          {text.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-[0.25em]">
              {Array.from(word).map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  className="inline-block"
                  variants={child}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </TagComponent>
      </motion.div>
    </div>
  );
};

export default AnimatedText;