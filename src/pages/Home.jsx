import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-violet-50 pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 leading-tight">
              Empowering Mental <span className="text-violet-800">Wellness</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Providing a safe, supportive, and non-judgemental space through compassionate, evidence-based psychological services.
            </p>
            <Link to="/contact">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#5B21B6" }}
                whileTap={{ scale: 0.95 }}
                className="bg-violet-800 text-white font-medium py-4 px-10 rounded-full shadow-lg transition-all duration-300"
              >
                Book an Appointment
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover"
            />{/*Aarti Bua image*/ }
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl h-80 border-l-8 border-violet-400"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-3xl font-medium text-slate-800 mb-6">Our Philosophy</h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              Our service is more personalized and highly confidential. We believe in natural lifestyle and behavioral modifications to restructure attitudes and empower you to thrive.
            </p>
            <Link to="/about" className="text-violet-700 font-semibold hover:text-violet-900 flex items-center gap-2 transition-colors">
              Read more about us <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="bg-violet-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Individual Therapy', 'Family Counselling', 'Specialized Programs'].map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-violet-200"
              >
                <div className="h-12 w-12 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center mb-6 text-xl">
                  ✦
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{service}</h3>
                <p className="text-slate-600 text-sm">Empowering families and communities to achieve resilience through evidence-based services.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;