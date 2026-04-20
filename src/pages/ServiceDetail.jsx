import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { db } from '../firebase'; // <-- Added Firebase Import
import { collection, getDocs, query, where } from 'firebase/firestore'; // <-- Added Firestore tools

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData[id];

  // --- NEW: State for live testimonials ---
  const [liveTestimonials, setLiveTestimonials] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // --- NEW: Fetch related testimonials ---
    const fetchServiceTestimonials = async () => {
      if (!service) return;
      
      try {
        // Query Firebase: Only get testimonials where "service" matches this page's title
        const q = query(
          collection(db, "testimonials"), 
          where("service", "==", service.title)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setLiveTestimonials(fetchedItems);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchServiceTestimonials();
  }, [id, service]);

  if (!service) {
    return <Navigate to="/services" />;
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // --- SMART FALLBACK & MULTIPLIER ---
  // If there are live testimonials, use them. Otherwise, fall back to the static data.
  const baseTestimonials = liveTestimonials.length > 0 ? liveTestimonials : service.testimonials;

  // We multiply the array to make sure the infinite marquee always has enough items to scroll smoothly
  let marqueeItems = [];
  while (marqueeItems.length < 12 && baseTestimonials.length > 0) {
    marqueeItems = [...marqueeItems, ...baseTestimonials];
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16 overflow-hidden">
      
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 40s linear infinite;
          width: max-content;
        }
        .animate-marquee-right {
          animation: marqueeRight 40s linear infinite;
          width: max-content;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/services" className="inline-flex items-center text-violet-600 hover:text-violet-800 font-medium mb-8 md:mb-10 transition-colors">
          <span className="mr-2 text-xl">←</span> Back to All Services
        </Link>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-8 md:p-14 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 mb-10 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6">{service.title}</h1>
          <p className="text-lg md:text-xl text-violet-700 font-medium mb-6 md:mb-8">{service.shortDesc}</p>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">{service.fullDesc}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-violet-50 p-6 md:p-8 rounded-2xl border border-violet-100 h-full">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Key Benefits</h3>
            <ul className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-violet-600 mr-3 mt-1 text-lg md:text-xl">✓</span>
                  <span className="text-slate-700 text-base md:text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-violet-800 p-8 md:p-10 rounded-2xl text-white flex flex-col justify-center h-full shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Take the Next Step</h3>
            <p className="text-violet-100 mb-8 text-base md:text-lg">Your mental wellness is a priority. Reach out today to schedule a confidential consultation.</p>
            <Link to="/contact">
              <button className="w-full bg-white text-violet-900 font-bold py-3 md:py-4 rounded-xl shadow-md hover:bg-violet-50 transition-colors">
                Book an Appointment
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-[90rem] mx-auto px-0 sm:px-6 mt-10 mb-10">
        <div className="bg-violet-100 sm:rounded-[2.5rem] py-10 md:py-16 border-y sm:border border-violet-200 shadow-inner relative overflow-hidden">
          
          <h2 className="text-2xl md:text-4xl font-bold text-violet-900 mb-8 md:mb-12 text-center relative z-20 px-4">
            Patient Experiences
          </h2>
          
          {/* Row 1: Scrolling Left */}
          <div className="marquee-container overflow-hidden py-2 md:py-4 w-full relative z-10">
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-40 bg-gradient-to-r from-violet-100 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 sm:w-16 md:w-40 bg-gradient-to-l from-violet-100 to-transparent z-10 pointer-events-none"></div>
            
            <div className="animate-marquee-left flex gap-4 md:gap-6 px-2 md:px-3">
              {marqueeItems.map((testimonial, index) => {
                // Dynamically render stars if rating exists, otherwise default to 5
                const rating = testimonial.rating || 5;
                const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

                return (
                  <div 
                    key={`row1-${index}`}
                    className="w-[280px] md:w-96 flex-shrink-0 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-violet-300 transition-all duration-300 cursor-default group relative overflow-hidden flex flex-col justify-between border border-transparent"
                  >
                    <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-violet-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className="flex space-x-1 text-amber-400 text-base md:text-lg">{stars}</div>
                        <span className="text-3xl md:text-4xl text-violet-100 font-serif leading-none mt-2 group-hover:text-violet-300 transition-colors">"</span>
                      </div>
                      <p className="text-slate-700 italic mb-6 md:mb-8 text-sm md:text-base leading-relaxed line-clamp-4">
                        {/* Looks for 'quote' from Firebase, or 'feedback' from static data */}
                        {testimonial.quote || testimonial.feedback}
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center pt-4 border-t border-slate-50">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-base md:text-lg mr-3">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold text-xs md:text-sm">{testimonial.name}</p>
                        <p className="text-violet-600 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Verified Patient</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="marquee-container overflow-hidden py-2 md:py-4 w-full relative z-10 mt-2">
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 md:w-40 bg-gradient-to-r from-violet-100 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 sm:w-16 md:w-40 bg-gradient-to-l from-violet-100 to-transparent z-10 pointer-events-none"></div>
            
            <div className="animate-marquee-right flex gap-4 md:gap-6 px-2 md:px-3">
              {[...marqueeItems].reverse().map((testimonial, index) => {
                const rating = testimonial.rating || 5;
                const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

                return (
                  <div 
                    key={`row2-${index}`}
                    className="w-[280px] md:w-96 flex-shrink-0 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-violet-300 transition-all duration-300 cursor-default group relative overflow-hidden flex flex-col justify-between border border-transparent"
                  >
                    <div className="absolute -right-6 -top-6 w-20 md:w-24 h-20 md:h-24 bg-violet-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className="flex space-x-1 text-amber-400 text-base md:text-lg">{stars}</div>
                        <span className="text-3xl md:text-4xl text-violet-100 font-serif leading-none mt-2 group-hover:text-violet-300 transition-colors">"</span>
                      </div>
                      <p className="text-slate-700 italic mb-6 md:mb-8 text-sm md:text-base leading-relaxed line-clamp-4">
                        {testimonial.quote || testimonial.feedback}
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center pt-4 border-t border-slate-50">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-base md:text-lg mr-3">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold text-xs md:text-sm">{testimonial.name}</p>
                        <p className="text-violet-600 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Verified Patient</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ServiceDetail;