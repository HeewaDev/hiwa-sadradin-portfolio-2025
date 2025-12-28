import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/HeewaDev',
      icon: Github,
      color: 'hover:text-gray-400',
      cursorText: 'Code'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hiwa-sadraldeen/',
      icon: Linkedin,
      color: 'hover:text-blue-400',
      cursorText: 'Connect'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/hiwa_sadraden/',
      icon: Instagram,
      color: 'hover:text-pink-400',
      cursorText: 'Follow'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/hiwa.sadraden/',
      icon: Facebook,
      color: 'hover:text-blue-500',
      cursorText: 'Connect'
    }
  ];

  return (
    <footer className="bg-black text-white py-section-xs md:py-section-sm px-page-sm md:px-page-md lg:px-page-lg">
      <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-heading-lg font-display font-bold mb-2">HIWA SADRADIN</h3>
            <p className="text-gray-400 text-sm">Full Stack Developer</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 transition-colors duration-300 ${social.color} magnetic-link`}
                  data-cursor-text={social.cursorText}
                  aria-label={social.name}
                >
                  <IconComponent className="w-6 h-6" />
                </a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-400 text-sm">
              © 2025 Hiwa Sadradin. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
