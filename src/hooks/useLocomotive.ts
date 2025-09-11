import { useEffect, useRef, MutableRefObject } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

export const useLocomotive = (start: boolean = true): MutableRefObject<LocomotiveScroll | null> => {
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!start) return;

    locomotiveScrollRef.current = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.2,
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        smoothTouch: false
      }
    });

    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, [start]);

  return locomotiveScrollRef;
};