import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Detect scroll direction
      if (scrollPosition > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      // Update last scroll position
      setLastScrollY(scrollPosition);

      // Determine the active section
      if (scrollPosition < 800) {
        setActiveSection('home');
      } else {
        setActiveSection('services');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const menuVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeIn' },
    },
  };

  const perspectiveVariants = {
    initial: {
      opacity: 0,
      rotateX: 90,
      translateY: 80,
      translateX: -20,
    },
    animate: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      translateX: 0,
      transition: {
        duration: 0.8,
        delay: 0.1 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Adjusted headerMotion to only control opacity, not position
  const headerMotion = {
    initial: { opacity: 0 },
    animate: {
      opacity: isVisible ? 1 : 0, // Fade in/out only, no position change
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  // Menu button line variants
  const topLineVariants = {
    closed: { rotate: 0, translateY: 0, width: '100%' },
    open: { rotate: 45, translateY: 8, width: '100%' },
    hover: { width: '100%' }
  };

  const middleLineVariants = {
    closed: { opacity: 1, width: '75%' },
    open: { opacity: 0, width: '0%' },
    hover: { width: '50%' }
  };

  const bottomLineVariants = {
    closed: { rotate: 0, translateY: 0, width: '50%' },
    open: { rotate: -45, translateY: -8, width: '100%' },
    hover: { width: '75%' }
  };

  return (
    <>
      <motion.header
        className={`fixed z-30 top-0 left-0 right-0 w-full px-page-xs md:px-page-sm lg:px-page-md py-6 pointer-events-none ${isOpen ? '' : 'mix-blend-difference'}`}
        variants={headerMotion}
        initial="initial"
        animate="animate"
        style={{ willChange: 'opacity' }}
      >
        <div className="flex justify-between items-center pointer-events-auto">
          <Link
            to="/"
            className="magnetic-link text-xl font-display font-bold relative"
            data-cursor-text="Home"
          >
            <motion.div
              className={`inline-block px-3 md:px-6 py-2 ${isOpen ? 'text-dark' : 'text-light'}`}
              animate={{
                color: isOpen ? 'rgb(10, 10, 10)' : 'rgb(245, 245, 245)', // dark when menu open, light otherwise
                transition: { duration: 0.5 },
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              HIWA SADRALDIN
              <motion.div
                className="h-0.5 absolute -bottom-1 left-0 right-0 mx-3 md:mx-6"
                animate={{
                  scaleX: 1,
                  backgroundColor: isOpen
                    ? 'rgb(10, 10, 10)' // dark when menu open
                    : activeSection === 'home'
                      ? 'rgb(245, 245, 245)' // light color
                      : activeSection === 'services'
                        ? 'rgb(233, 79, 55)' // accent red
                        : 'rgb(52, 152, 219)', // accent blue
                }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          </Link>

          <motion.button
            className="magnetic-link z-[70] relative w-12 h-12 flex flex-col items-end justify-center"
            data-cursor-text={isOpen ? "Close" : "Menu"}
            onClick={toggleMenu}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            style={{ pointerEvents: 'auto' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-end justify-center space-y-2 w-8">
              {/* Custom hamburger/close icon with animations */}
              <motion.div
                className={`h-0.5 rounded-full origin-center ${isOpen ? 'bg-dark' : 'bg-white'}`}
                initial={{ width: '100%' }}
                animate={isOpen ? "open" : isHovered ? "hover" : "closed"}
                variants={topLineVariants}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className={`h-0.5 rounded-full origin-center ${isOpen ? 'bg-dark' : 'bg-white'}`}
                initial={{ width: '75%' }}
                animate={isOpen ? "open" : isHovered ? "hover" : "closed"}
                variants={middleLineVariants}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className={`h-0.5 rounded-full origin-center ${isOpen ? 'bg-dark' : 'bg-white'}`}
                initial={{ width: '50%' }}
                animate={isOpen ? "open" : isHovered ? "hover" : "closed"}
                variants={bottomLineVariants}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center py-section-xl px-page-sm md:px-page-md lg:px-page-lg bg-beige"
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              backgroundImage: 'url("https://www.transparenttextures.com/patterns/textured-paper.png")'
            }}
          >
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-[60] p-2 hover:bg-dark/10 rounded-full transition-colors duration-300 magnetic-link"
              data-cursor-text="Close"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 md:w-8 md:h-8 text-dark" />
            </button>
            
            <div className="perspective-[1200px] overflow-hidden w-full">
              <nav className="flex flex-col items-center text-center space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    custom={i}
                    variants={perspectiveVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="overflow-hidden w-full"
                  >
                    <Link
                      to={link.path}
                      className={`font-display text-display-md sm:text-display-lg md:text-display-xl lg:text-display-2xl xl:text-display-3xl font-bold text-dark transition-colors relative ${location.pathname === link.path ? 'active-link' : ''
                        }`}
                      data-cursor-text={link.label}
                      onClick={() => setIsOpen(false)}
                    >
                      {location.pathname === link.path && (
                        <motion.div
                          className="h-1 bg-red-500 absolute bottom-4 left-0 w-full transition-all duration-300"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.4 }}
                          style={{ transformOrigin: 'left' }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;