import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="bg-violet-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Philosophy Section */}
        <motion.section initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-10 border-b-2 border-violet-200 pb-6">
            Our Philosophy
          </h1>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8 text-xl">
            <p>
              EnlitE Energizing Wellness Clinic was established to address the vital need for counseling as a treatment for various illnesses and diseases in rural areas. Our initial phase demonstrated remarkable outcomes, empowering people to build better lifestyles, richer attitudes, positive mental health, and the skills to handle stressful situations with self-confidence.
            </p>
            <p>
              We believe that mental health is just as critical as physical health. Our mission is to provide a safe, supportive, and non-judgemental space for individuals, families, and communities to achieve emotional wellness and resilience.
            </p>
          </div>
        </motion.section>

        {/* Vision Banner */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeUp} 
          className="bg-violet-800 text-white p-12 md:p-16 rounded-3xl shadow-xl text-center"
        >
          <h2 className="text-3xl font-medium mb-6 text-violet-100 italic">Our Vision</h2>
          <p className="text-2xl md:text-3xl font-light max-w-5xl mx-auto leading-tight">
            "Empowering individuals, families, and communities to achieve mental wellness and resilience through compassionate, evidence-based psychological services."
          </p>
        </motion.section>

        {/* Large Tiles for Core Values and Goals */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          
          {/* Core Values Section */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 px-2">Core Values</h2>
            <div className="space-y-6">
              {[
                { title: "Compassion", desc: "Providing a safe, non-judgmental space for clients." },
                { title: "Excellence", desc: "Delivering high-quality, research-informed services." },
                { title: "Inclusivity", desc: "Welcoming diversity and promoting cultural sensitivity." },
                { title: "Collaboration", desc: "Fostering strong relationships with clients and healthcare professionals." },
                { title: "Innovation", desc: "Embracing new techniques and technologies to enhance care." }
              ].map((value, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUp} 
                  whileHover={{ x: 10 }}
                  className="bg-white p-8 rounded-2xl border-l-8 border-violet-500 shadow-md transition-all"
                >
                  <strong className="text-violet-800 text-2xl block mb-2">{value.title}</strong>
                  <span className="text-slate-600 text-lg leading-relaxed">{value.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Goals Section */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 px-2">Our Goals</h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                "Provide accessible, affordable, mental health services.",
                "Foster a supportive community for clients and families.",
                "Stay at the forefront of psychological research and best practices.",
                "Develop strategic partnerships with healthcare organizations.",
                "Expand services to meet the evolving needs of the community."
              ].map((goal, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUp} 
                  className="flex items-center bg-violet-100 p-8 rounded-2xl border border-violet-200 shadow-sm"
                >
                  <div className="h-4 w-4 bg-violet-600 rounded-full mr-6 flex-shrink-0"></div>
                  <span className="text-slate-800 text-xl font-medium">{goal}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

      </div>
    </div>
  );
};

export default About;