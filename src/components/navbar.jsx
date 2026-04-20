import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from './logo.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Added Gallery right before Contact
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' }, 
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 md:h-28">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <motion.img 
                whileHover={{ scale: 1.02 }}
                className="h-16 md:h-24 w-auto object-contain" 
                src={logoImage} 
                alt="EnlitE Logo" 
              />
            </Link>
          </div>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ y: -2 }}>
                <Link 
                  to={link.path} 
                  className="text-slate-700 hover:text-violet-700 px-3 py-2 rounded-md text-lg font-medium transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button (Visible ONLY on Mobile) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-slate-700 hover:text-violet-700 focus:outline-none p-2"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={toggleMenu}
                  className="block px-4 py-3 text-xl font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-700 rounded-xl transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Link to="/contact" onClick={toggleMenu}>
                  <button className="w-full bg-violet-800 text-white font-bold py-4 rounded-xl shadow-md">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;