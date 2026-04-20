import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // State for the full-screen Lightbox
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGalleryItems(items);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = galleryItems.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* VIBRANT BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-violet-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse delay-1000 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Clinic <span className="text-violet-600 font-light">Gallery</span></h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Take a visual tour of EnlitE Clinic. Explore our welcoming environment, state-of-the-art facilities, and the healing spaces we've designed for your mental wellness journey.
          </p>
        </motion.div>

        {/* FILTER BUTTONS */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex justify-center flex-wrap gap-4 mb-12">
          {['all', 'photo', 'video'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold capitalize transition-all duration-300 shadow-sm ${
                filter === cat 
                ? 'bg-violet-700 text-white shadow-violet-200' 
                : 'bg-white text-slate-600 hover:bg-violet-50 hover:text-violet-700 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Media' : `${cat}s`}
            </button>
          ))}
        </motion.div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-3xl border border-white shadow-sm">
            <span className="text-4xl mb-4 block">📷</span>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No media found</h3>
            <p className="text-slate-500">Check back later for new updates to our gallery.</p>
          </div>
        )}

        {/* MASONRY GRID */}
        {!isLoading && filteredItems.length > 0 && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="relative group break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-white/60 bg-white/20"
                onClick={() => setSelectedMedia(item)}
              >
                
                {item.type === 'video' ? (
                  <div className="relative">
                    <video src={item.url} className="w-full h-auto" />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <span className="text-violet-700 text-2xl ml-1">▶</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={item.url} alt={item.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                )}

                {/* Hover Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-medium text-sm truncate drop-shadow-md">{item.title}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/90 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-50">
              ✕
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            >
              {selectedMedia.type === 'video' ? (
                <video src={selectedMedia.url} className="w-full max-h-[85vh] rounded-2xl object-contain bg-black" controls autoPlay />
              ) : (
                <img src={selectedMedia.url} alt={selectedMedia.title} className="w-full max-h-[85vh] rounded-2xl object-contain" />
              )}
              <p className="text-white/80 mt-4 text-center font-medium">{selectedMedia.title}</p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;