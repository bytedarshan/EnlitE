import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  // --- CLOUDINARY SETTINGS ---
  const CLOUD_NAME = "dojfcjtgn"; 
  const UPLOAD_PRESET = "enlite_uploads"; 

  const [activeTab, setActiveTab] = useState('gallery');
  
  // Gallery States
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Achievements States
  const [achievements, setAchievements] = useState([]);
  const [isUploadingAchievement, setIsUploadingAchievement] = useState(false);
  const [achTitle, setAchTitle] = useState('');
  const [achDesc, setAchDesc] = useState('');

  useEffect(() => {
    fetchGallery();
    fetchAchievements();
    window.scrollTo(0, 0);
  }, []);

  // --- FETCH FUNCTIONS ---
  const fetchGallery = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setGalleryItems(items);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "achievements"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      // Sort manually so the newest achievements appear at the top
      items.sort((a, b) => b.createdAt - a.createdAt);
      setAchievements(items);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  // --- GALLERY UPLOAD FUNCTION ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (!data.secure_url) {
        throw new Error("Upload to Cloudinary failed");
      }

      const type = data.resource_type === 'video' ? 'video' : 'photo';

      await addDoc(collection(db, "gallery"), {
        url: data.secure_url,
        type: type,
        title: file.name
      });

      await fetchGallery();
      setIsUploading(false);
      
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Make sure your Cloudinary preset is set to 'Unsigned'.");
      setIsUploading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to remove this from the website?")) return;
    try {
      await deleteDoc(doc(db, "gallery", itemId));
      setGalleryItems(galleryItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Delete failed.");
    }
  };

  // --- ACHIEVEMENT SUBMIT FUNCTION ---
  const handleAchievementSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.image.files[0];
    
    if (!file || !achTitle || !achDesc) {
      return alert("Please provide a title, description, and an image.");
    }

    setIsUploadingAchievement(true);
    try {
      // 1. Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (!data.secure_url) throw new Error("Cloudinary upload failed");
      
      // 2. Save text and image URL to Firebase
      await addDoc(collection(db, "achievements"), {
        title: achTitle,
        description: achDesc,
        imageUrl: data.secure_url,
        createdAt: Date.now() 
      });

      // 3. Reset form and refresh list
      setAchTitle('');
      setAchDesc('');
      e.target.reset(); 
      await fetchAchievements();
    } catch (error) {
      alert("Failed to save achievement.");
      console.error(error);
    }
    setIsUploadingAchievement(false);
  };

  const handleDeleteAchievement = async (itemId) => {
    if (!window.confirm("Delete this achievement?")) return;
    try {
      await deleteDoc(doc(db, "achievements", itemId));
      setAchievements(achievements.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting achievement:", error);
      alert("Delete failed.");
    }
  };

  const filteredGallery = galleryItems.filter(item => 
    galleryFilter === 'all' ? true : item.type === galleryFilter
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden">
      
      {/* VIBRANT BACKGROUND BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-violet-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse delay-1000 pointer-events-none"></div>

      <nav className="relative z-20 bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              EnlitE <span className="text-violet-600 font-light">Portal</span>
            </span>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors">View Public Site ↗</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white/40 backdrop-blur-2xl p-6 rounded-3xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] sticky top-28">
              <p className="text-xs font-bold text-violet-500 uppercase tracking-wider mb-4 px-4">Management</p>
              <nav className="flex flex-col space-y-2">
                <button onClick={() => setActiveTab('gallery')} className={`flex items-center px-4 py-3 rounded-2xl font-medium text-left transition-all ${activeTab === 'gallery' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}>
                  <span className="mr-3 text-lg">🖼️</span> Gallery Manager
                </button>
                <button onClick={() => setActiveTab('achievements')} className={`flex items-center px-4 py-3 rounded-2xl font-medium text-left transition-all ${activeTab === 'achievements' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}>
                  <span className="mr-3 text-lg">🏆</span> Achievements
                </button>
              </nav>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex-grow bg-white/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_15px_35px_0_rgba(31,38,135,0.1)] min-h-[600px]">
            
            {/* --- GALLERY TAB --- */}
            {activeTab === 'gallery' && (
              <div className="animate-in fade-in duration-500">
                <div className="mb-8 border-b border-white/40 pb-6">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Gallery Manager</h2>
                  <p className="text-slate-600">Upload and manage photos and videos for the public gallery.</p>
                </div>

                <label className="mb-10 border-2 border-dashed border-violet-300 bg-white/30 hover:bg-white/50 transition-colors rounded-3xl p-10 text-center cursor-pointer group flex flex-col items-center justify-center relative">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    accept="image/*,video/*" 
                    disabled={isUploading}
                  />
                  {isUploading ? (
                    <div className="text-violet-600 font-bold animate-pulse">Uploading securely to Cloudinary... Please wait.</div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">↑</div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Click to Upload Image or Video</h3>
                      <p className="text-slate-500 text-sm">Powered by Cloudinary</p>
                    </>
                  )}
                </label>

                <div className="flex space-x-2 mb-6">
                  {['all', 'photo', 'video'].map((filter) => (
                    <button key={filter} onClick={() => setGalleryFilter(filter)} className={`px-5 py-2 rounded-full text-sm font-bold capitalize transition-all ${galleryFilter === filter ? 'bg-slate-800 text-white shadow-md' : 'bg-white/50 text-slate-600 border border-white/60 hover:bg-white/80'}`}>
                      {filter}s
                    </button>
                  ))}
                </div>

                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                  {filteredGallery.map((item) => (
                    <div key={item.id} className="relative group break-inside-avoid rounded-2xl overflow-hidden shadow-sm border border-white/40 bg-white/20">
                      
                      {item.type === 'video' ? (
                        <video src={item.url} className="w-full h-auto" controls={false} />
                      ) : (
                        <img src={item.url} alt={item.title} className="w-full h-auto object-cover" />
                      )}
                      
                      {item.type === 'video' && (
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md shadow-lg">▶ Video</div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-sm font-bold transition-colors"
                        >
                          🗑️ Remove
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
                
                {filteredGallery.length === 0 && !isUploading && (
                  <p className="text-center text-slate-500 py-10 font-medium">No media uploaded yet. Upload a file above!</p>
                )}

              </div>
            )}

            {/* --- ACHIEVEMENTS TAB --- */}
            {activeTab === 'achievements' && (
              <div className="animate-in fade-in duration-500">
                <div className="mb-8 border-b border-white/40 pb-6">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Achievements Manager</h2>
                  <p className="text-slate-600">Add new milestones, awards, and recognitions.</p>
                </div>

                {/* ACHIEVEMENT FORM */}
                <form onSubmit={handleAchievementSubmit} className="bg-white/50 p-6 md:p-8 rounded-3xl border border-white/60 shadow-sm mb-10">
                  <h3 className="text-xl font-bold text-violet-900 mb-6">Add New Achievement</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Title / Award Name</label>
                      <input 
                        type="text" 
                        value={achTitle}
                        onChange={(e) => setAchTitle(e.target.value)}
                        placeholder="e.g., Best Clinic 2025" 
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Achievement Image</label>
                      <input 
                        type="file" 
                        name="image"
                        accept="image/*"
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-2.5 outline-none text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea 
                      value={achDesc}
                      onChange={(e) => setAchDesc(e.target.value)}
                      placeholder="Briefly describe this milestone..." 
                      rows="3"
                      className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isUploadingAchievement}
                    className={`w-full font-bold py-3.5 rounded-xl transition-all shadow-md ${isUploadingAchievement ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-violet-700 hover:bg-violet-800 text-white'}`}
                  >
                    {isUploadingAchievement ? 'Saving Data...' : '+ Publish Achievement'}
                  </button>
                </form>

                {/* ACHIEVEMENTS LIST */}
                <h3 className="text-xl font-bold text-slate-800 mb-6">Current Achievements</h3>
                <div className="space-y-4">
                  {achievements.map((item) => (
                    <div key={item.id} className="bg-white/40 p-4 rounded-2xl border border-white/60 shadow-sm flex items-center gap-6">
                      <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-xl shadow-sm" />
                      <div className="flex-grow">
                        <h4 className="text-lg font-bold text-slate-800">{item.title}</h4>
                        <p className="text-slate-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteAchievement(item.id)}
                        className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-xl transition-colors font-bold shadow-sm"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  
                  {achievements.length === 0 && !isUploadingAchievement && (
                    <p className="text-center text-slate-500 py-6 border-2 border-dashed border-slate-200 rounded-2xl">No achievements published yet.</p>
                  )}
                </div>

              </div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;