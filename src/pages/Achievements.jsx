import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      // Fetching all achievements
      const querySnapshot = await getDocs(collection(db, "achievements"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by newest first
      items.sort((a, b) => b.createdAt - a.createdAt);
      setAchievements(items);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* VIBRANT BACKGROUND BLOBS */}
      <div className="absolute top-0 right-[-10%] w-[40rem] h-[40rem] bg-violet-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute top-[40%] left-[-10%] w-[40rem] h-[40rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse delay-1000 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our <span className="text-violet-600 font-light">Milestones</span></h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Excellence in mental healthcare is an ongoing journey. Discover the awards, recognitions, and major milestones that drive EnlitE Clinic forward.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && achievements.length === 0 && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-white shadow-sm max-w-2xl mx-auto">
            <span className="text-5xl mb-4 block">🏆</span>
            <h3 className="text-xl font-bold text-slate-800 mb-2">More achievements coming soon</h3>
            <p className="text-slate-500">We are constantly striving for excellence.</p>
          </div>
        )}

        {/* ALTERNATING FEATURE CARDS */}
        {!isLoading && achievements.length > 0 && (
          <div className="space-y-16 md:space-y-24">
            {achievements.map((item, index) => {
              // Determine if image should be on the left (even index) or right (odd index)
              const isImageLeft = index % 2 === 0;

              return (
                <motion.div 
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center bg-white/40 backdrop-blur-xl p-6 lg:p-10 rounded-[2.5rem] border border-white/60 shadow-[0_15px_35px_0_rgba(31,38,135,0.05)] hover:shadow-[0_15px_35px_0_rgba(31,38,135,0.1)] transition-all duration-500`}
                >
                  
                  {/* IMAGE HALF */}
                  <div className="w-full lg:w-1/2 flex-shrink-0 relative group">
                    <div className="overflow-hidden rounded-3xl shadow-md border border-white/80">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    {/* Decorative element behind image */}
                    <div className={`absolute -inset-4 bg-gradient-to-tr from-violet-200 to-blue-100 rounded-[2.5rem] -z-10 opacity-50 transform ${isImageLeft ? 'rotate-3' : '-rotate-3'} group-hover:rotate-0 transition-transform duration-500`}></div>
                  </div>

                  {/* TEXT HALF */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 font-bold text-sm rounded-full mb-6 w-max shadow-sm">
                      {new Date(item.createdAt).getFullYear() || "Milestone"}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Achievements;