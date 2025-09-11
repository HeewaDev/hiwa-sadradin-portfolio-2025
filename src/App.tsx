import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useMousePosition } from './hooks/useMousePosition';
import { useLocomotive } from './hooks/useLocomotive';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Lazy load pages for code splitting and better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

// Components
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Layout
const AppLayout = () => {
  const location = useLocation();
  const { x, y } = useMousePosition();
  const locomotiveScroll = useLocomotive();

  useEffect(() => {
    // Update scroll on route change
    locomotiveScroll.current?.scrollTo(0, { duration: 0 });
  }, [location.pathname]);

  // Set page-specific SEO based on current route
  const getPageMeta = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: 'Hiwa Sadraldin | Software Developer',
          description: 'Full-stack developer specializing in React.js, Node.js, and advanced database solutions. Building robust web applications and operational dashboards.'
        };
      case '/about':
        return {
          title: 'About | Hiwa Sadraldin',
          description: 'Learn about my background in full-stack development, expertise in React.js, Node.js, and database architecture.'
        };
      case '/projects':
        return {
          title: 'Projects | Hiwa Sadraldin',
          description: 'Explore my portfolio of full-stack web applications, operational dashboards, and custom CMS platforms.'
        };
      case '/blog':
        return {
          title: 'Blog | Hiwa Sadraldin',
          description: 'Read my thoughts on development, technology trends, and insights from my journey as a full-stack developer.'
        };
      case '/contact':
        return {
          title: 'Contact | Hiwa Sadraldin',
          description: 'Get in touch to discuss your project needs. Specialized in developing operational dashboards and web applications.'
        };
      default:
        return {
          title: 'Hiwa Sadraldin | Software Developer',
          description: 'Full-stack developer specializing in React.js, Node.js, and advanced database solutions.'
        };
    }
  };

  const pageMeta = getPageMeta();

  return (
    <>
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta name="keywords" content="Hiwa Sadraldin, Hiwa Sadraden, Hiwa Sadradin, Hiwa Sadradeen, software developer, full-stack, React, Node.js" />
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:description" content={pageMeta.description} />
        <meta property="og:url" content={`https://yourportfolio.com${location.pathname}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageMeta.title} />
        <meta name="twitter:description" content={pageMeta.description} />
      </Helmet>
      
      <Cursor
        x={x}
        y={y}
        defaultColor="rgba(255, 255, 255, 0.2)"
        hoverColor="rgba(255, 255, 255, 0.3)"
        defaultSize={40}
        hoverSize={80}
        textSize={100}
        magnetStrength={0.4}
      />
      <Navigation />
      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* Global SEO - shared across all pages */}
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="keywords" content="Hiwa Sadraldin, Hiwa Sadraden, Hiwa Sadradin, Hiwa Sadradeen, software developer, full-stack developer" />
          
          {/* Global structured data with name variations */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Hiwa Sadraldin",
                "alternateName": [
                  "Hiwa Sadraden",
                  "Hiwa Sadradin",
                  "Hiwa Sadradeen"
                ],
                "url": "https://yourportfolio.com",
                "jobTitle": "Software Developer",
                "knowsAbout": ["React.js", "Node.js", "Database Design", "Full-Stack Development"]
              }
            `}
          </script>
        </Helmet>
        
        <AppLayout />
      </Router>
    </HelmetProvider>
  );
}

export default App;