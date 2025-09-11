import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      
      frame = requestAnimationFrame(() => {
        setMousePosition({ 
          x: e.clientX,
          y: e.clientY
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { 
      passive: true,
      capture: true
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return mousePosition;
};