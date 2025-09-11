import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextMarqueeProps {
  text: string;
  reverse?: boolean;
  speed?: number;
}

const TextMarquee: React.FC<TextMarqueeProps> = ({ 
  text, 
  reverse = false, 
  speed = 0.5 
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    const marqueeInnerElement = marqueeInnerRef.current;
    
    if (!marqueeElement || !marqueeInnerElement) return;
    
    const marqueeContent = marqueeInnerElement.querySelector('.marquee-content');
    if (!marqueeContent) return;
    
    const clone = marqueeContent.cloneNode(true);
    marqueeInnerElement.appendChild(clone);
    
    const direction = reverse ? -1 : 1;
    
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(marqueeInnerElement, {
      x: `${-50 * direction}%`,
      duration: 25 / speed,
      ease: "none"
    });
    
    return () => {
      tl.kill();
    };
  }, [reverse, speed]);
  
  return (
    <div 
      ref={marqueeRef} 
      className="overflow-hidden w-full"
    >
      <div 
        ref={marqueeInnerRef} 
        className="flex"
      >
        <div className="marquee-content flex-shrink-0 font-display flex items-center">
          {Array(6).fill(null).map((_, index) => (
            <span 
              key={index}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white opacity-90 mx-4 tracking-wide"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextMarquee;