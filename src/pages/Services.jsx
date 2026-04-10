import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';

const Services = () => {
  const servicesList = Object.values(servicesData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Catchy card hover
  const cardHover = {
    hover: { 
      y: -10, 
      scale: 1.03, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderColor: "#8B5CF6", // Turns the border light violet
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
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
                whileHover={cardHover.hover}
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-center h-full cursor-pointer bg-white"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.shortDesc}</p>
                <div className="mt-6 text-violet-600 font-bold text-sm flex items-center group">
                  Learn more 
                  <motion.span 
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="ml-1 text-lg"
                  >
                    →
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
          className="mt-20 bg-violet-800 rounded-3xl p-12 text-center shadow-lg cursor-default transition-all"
        >
            <h3 className="text-2xl text-white font-medium mb-4">Ready to start your journey?</h3>
            <p className="text-violet-200 mb-8 max-w-xl mx-auto text-lg">Call our clinic to discuss which service is right for you. We ensure strict confidentiality.</p>
            <motion.p 
              whileHover={{ scale: 1.05 }}
              className="text-4xl text-white tracking-wider font-bold inline-block cursor-pointer"
            >
              +91 98840 27755
            </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;