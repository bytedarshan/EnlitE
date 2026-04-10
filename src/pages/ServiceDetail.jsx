import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData[id];
  
  // State for Testimonial Pagination
  const [page, setPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return <Navigate to="/services" />;
  }

  // Calculate pages (2 testimonials per page)
  const itemsPerPage = 2;
  const totalPages = Math.ceil(service.testimonials.length / itemsPerPage);
  
  // Slice the array to get only the current 2 testimonials
  const currentTestimonials = service.testimonials.slice(
    page * itemsPerPage, 
    (page * itemsPerPage) + itemsPerPage
  );

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Animation for the sliding testimonials
  const slideVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link to="/services" className="inline-flex items-center text-violet-600 hover:text-violet-800 font-medium mb-10 transition-colors">
          <span className="mr-2 text-xl">←</span> Back to All Services
        </Link>

        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-slate-100 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{service.title}</h1>
          <p className="text-xl text-violet-700 font-medium mb-8">{service.shortDesc}</p>
          <p className="text-lg text-slate-700 leading-relaxed">{service.fullDesc}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Benefits List */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-violet-50 p-8 rounded-2xl border border-violet-100 h-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Key Benefits</h3>
            <ul className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-violet-600 mr-3 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Call to Action */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-violet-800 p-10 rounded-2xl text-white flex flex-col justify-center h-full shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Take the Next Step</h3>
            <p className="text-violet-100 mb-8 text-lg">Your mental wellness is a priority. Reach out today to schedule a confidential consultation.</p>
            <Link to="/contact">
              <button className="w-full bg-white text-violet-900 font-bold py-4 rounded-xl shadow-md hover:bg-violet-50 transition-colors">
                Book an Appointment
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Testimonials Slider Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">Patient Experiences</h2>
            
            {/* Slider Controls */}
            <div className="flex space-x-3">
              <button onClick={prevPage} className="h-10 w-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center hover:bg-violet-200 transition-colors focus:outline-none">
                ←
              </button>
              <button onClick={nextPage} className="h-10 w-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center hover:bg-violet-200 transition-colors focus:outline-none">
                →
              </button>
            </div>
          </div>

          {/* The Animated Carousel */}
          <div className="min-h-[250px] relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={page} 
                variants={slideVariants} 
                initial="enter" 
                animate="center" 
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {currentTestimonials.map((testimonial, index) => (
                  <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                    <span className="text-6xl text-violet-200 absolute top-2 left-4 font-serif leading-none">"</span>
                    <p className="text-slate-600 italic mb-6 relative z-10 text-lg pt-6 line-clamp-4">
                      {testimonial.feedback}
                    </p>
                    <p className="text-violet-800 font-bold text-right">- {testimonial.name}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Page Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === page ? 'w-8 bg-violet-600' : 'w-2 bg-violet-200'}`} 
              />
            ))}
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default ServiceDetail;