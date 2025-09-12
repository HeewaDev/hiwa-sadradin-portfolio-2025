import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  x: number;
  y: number;
  // Optional props for customization
  defaultColor?: string;
  hoverColor?: string;
  defaultSize?: number;
  hoverSize?: number;
  textSize?: number;
  magnetStrength?: number;
}

const Cursor: React.FC<CursorProps> = ({
  x,
  y,
  defaultColor = 'rgba(255, 255, 255, 0.15)',
  hoverColor = 'rgba(255, 255, 255, 0.2)',
  defaultSize = 44,
  hoverSize = 80,
  textSize = 100,
  magnetStrength = 0.35,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  // For magnetic effect
  const [magneticX, setMagneticX] = useState(0);
  const [magneticY, setMagneticY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update visibility when position changes from default
  useEffect(() => {
    if (x !== -100 && y !== -100 && !isVisible && !isMobile) {
      setIsVisible(true);
    }
  }, [x, y, isVisible, isMobile]);

  // Handle interactions with interactive elements
  useEffect(() => {
    // Don't initialize cursor on mobile devices
    if (isMobile) {
      return;
    }
    
    // Interactive element selector - extend this to include any elements you want to apply effects to
    const interactiveSelector = '.link-hover, .magnetic-link, a, button, [data-cursor], [role="button"], .interactive';
    
    const handleLinkHoverEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const text = target.getAttribute('data-cursor-text');
      
      setCursorVariant(text ? 'text' : 'link');
      if (text) {
        setCursorText(text);
      }
      
      // Set hovering state for magnetic effect
      setIsHovering(true);
    };

    const handleLinkHoverLeave = () => {
      setCursorVariant('default');
      setCursorText('');
      setIsHovering(false);
      // Reset magnetic offset
      setMagneticX(0);
      setMagneticY(0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only apply magnetic effect when hovering over interactive elements
      if (!isHovering) return;
      
      const target = e.target as HTMLElement;
      
      // Check if target or its parents match our interactive selector
      const isInteractive = target.matches(interactiveSelector) || 
                           !!target.closest(interactiveSelector);
      
      if (!isInteractive) return;
      
      // Get element's bounding rectangle
      const element = target.matches(interactiveSelector) ? 
                     target : target.closest(interactiveSelector) as HTMLElement;
      
      const rect = element.getBoundingClientRect();
      
      // Calculate element center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Apply magnetic effect - pull cursor toward center
      setMagneticX(-distanceX * magnetStrength);
      setMagneticY(-distanceY * magnetStrength);
    };

    // Handle mouse click event for click animation
    const handleMouseClick = () => {
      setClickEffect(true);
      setTimeout(() => setClickEffect(false), 300);
    };

    // Observer to detect dynamic elements added to the DOM
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          document.querySelectorAll(interactiveSelector).forEach(el => {
            if (!el.hasAttribute('cursor-listener')) {
              el.setAttribute('cursor-listener', 'true');
              el.addEventListener('mouseenter', handleLinkHoverEnter);
              el.addEventListener('mouseleave', handleLinkHoverLeave);
            }
          });
        }
      });
    });

    // Initialize event listeners for existing elements
    document.querySelectorAll(interactiveSelector).forEach((el) => {
      el.setAttribute('cursor-listener', 'true');
      el.addEventListener('mouseenter', handleLinkHoverEnter);
      el.addEventListener('mouseleave', handleLinkHoverLeave);
    });
    
    // Add mouse event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseClick);
    window.addEventListener('mouseenter', () => setIsVisible(true));
    window.addEventListener('mouseleave', () => setIsVisible(false));

    // Observe the document for dynamically added elements
    observer.observe(document.body, { childList: true, subtree: true });

    // Disable default cursor
    document.body.style.cursor = 'none';

    return () => {
      // Clean up all event listeners
      document.querySelectorAll('[cursor-listener]').forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHoverEnter);
        el.removeEventListener('mouseleave', handleLinkHoverLeave);
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseClick);
      window.removeEventListener('mouseenter', () => setIsVisible(true));
      window.removeEventListener('mouseleave', () => setIsVisible(false));
      observer.disconnect();
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [isHovering, magnetStrength, isMobile]);

  // Professional cursor variants - clean and minimal
  const variants = {
    default: {
      x: x - defaultSize / 2,
      y: y - defaultSize / 2,
      height: defaultSize,
      width: defaultSize,
      opacity: isVisible ? 1 : 0,
      scale: clickEffect ? 0.9 : 1,
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    link: {
      x: x - hoverSize / 2 + magneticX,
      y: y - hoverSize / 2 + magneticY,
      height: hoverSize,
      width: hoverSize,
      opacity: isVisible ? 1 : 0,
      scale: clickEffect ? 0.9 : 1,
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    text: {
      x: x - textSize / 2 + magneticX,
      y: y - textSize / 2 + magneticY,
      height: textSize,
      width: textSize,
      opacity: isVisible ? 1 : 0,
      scale: clickEffect ? 0.95 : 1,
      borderRadius: "50%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
    }
  };

  // Professional inner dot - clean and minimal
  const innerDotVariants = {
    default: {
      opacity: 1,
      scale: 0.3,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    link: {
      opacity: 0,
      scale: 0,
    },
    text: {
      opacity: 0,
      scale: 0,
    }
  };

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Main cursor circle */}
      <motion.div 
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ 
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.1,
          restDelta: 0.001
        }}
      >
        {/* Inner dot for more precise pointing */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-1 h-1"
          variants={innerDotVariants}
          animate={cursorVariant}
          transition={{ 
            duration: 0.15,
            ease: "easeOut"
          }}
        />

        {/* Text container */}
        {cursorText && (
          <div className="flex items-center justify-center h-full w-full text-white text-sm font-medium tracking-wider">
            {cursorText}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cursor;