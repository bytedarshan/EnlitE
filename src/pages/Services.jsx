import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const servicesList = [
    { title: "Individual, Group & Family Therapy", desc: "Collaborative sessions to foster understanding and healthier relationships." },
    { title: "Assessment & Diagnosis", desc: "Comprehensive psychological evaluations to guide effective treatment plans." },
    { title: "Mental Health Counselling", desc: "Dedicated support for navigating anxiety, depression, and daily stressors." },
    { title: "Specialized Programs", desc: "Targeted interventions for trauma, complex relationships, and ADHD." },
    { title: "Career Guidance", desc: "Workshops and training programs to align your professional path with your mental wellbeing." },
    { title: "Online Therapy", desc: "Flexible, secure telehealth options for care from the comfort of your home." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-medium text-slate-800 mb-6">Clinical Services</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Delivering personalized, evidence-based psychological services designed to support you at every stage of life. Our environment is inclusive, accessible, and comfortable for all.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesList.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-center"
            >
              <h3 className="text-xl font-medium text-slate-800 mb-3">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-20 bg-teal-800 rounded-2xl p-10 text-center shadow-md"
        >
            <h3 className="text-2xl text-white font-medium mb-4">Ready to start your journey?</h3>
            <p className="text-teal-100 mb-8 max-w-xl mx-auto">Call our clinic to discuss which service is right for you. We ensure strict confidentiality.</p>
            <p className="text-3xl text-white tracking-wide font-semibold">+91 98840 27755</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;