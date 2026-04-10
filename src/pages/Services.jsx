import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData'; // Importing our data

const Services = () => {
  // Convert our data object into an array for easy mapping
  const servicesList = Object.values(servicesData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-violet-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-medium text-slate-800 mb-6">Clinical Services</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Delivering personalized, evidence-based psychological services designed to support you at every stage of life. Click on any service to learn more.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesList.map((service) => (
            <Link to={`/services/${service.id}`} key={service.id}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-violet-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-center h-full cursor-pointer"
              >
                <h3 className="text-xl font-medium text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.shortDesc}</p>
                <div className="mt-4 text-violet-600 font-medium text-sm flex items-center">
                  Learn more <span className="ml-1">→</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 bg-violet-800 rounded-2xl p-10 text-center shadow-md"
        >
            <h3 className="text-2xl text-white font-medium mb-4">Ready to start your journey?</h3>
            <p className="text-violet-100 mb-8 max-w-xl mx-auto">Call our clinic to discuss which service is right for you. We ensure strict confidentiality.</p>
            <p className="text-3xl text-white tracking-wide font-semibold">+91 98840 27755</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;