import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImage from './logo.png'; 

const Navbar = () => {
  const linkHover = {
    hover: { scale: 1.05, y: -2, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <motion.img 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="h-20 md:h-24 w-auto object-contain" 
                src={logoImage} 
                alt="EnlitE Energizing Wellness Clinic Logo" 
              />
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-8 items-center">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <motion.div key={item} variants={linkHover} whileHover="hover">
                <Link 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="text-slate-700 hover:text-violet-700 px-3 py-2 rounded-md text-base lg:text-lg font-medium transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;