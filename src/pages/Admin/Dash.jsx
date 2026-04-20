import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const Dash = () => {
  // --- CLOUDINARY SETTINGS ---
  const CLOUD_NAME = "dojfcjtgn"; 
  const UPLOAD_PRESET = "enlite_uploads"; 

  const navigate = useNavigate();

  // Set 'overview' as the default tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // Gallery States
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Achievements States
  const [achievements, setAchievements] = useState([]);
  const [isUploadingAchievement, setIsUploadingAchievement] = useState(false);
  const [achTitle, setAchTitle] = useState('');
  const [achDesc, setAchDesc] = useState('');

  // Inbox States
  const [messages, setMessages] = useState([]);

  // Testimonials States
  const [testimonials, setTestimonials] = useState([]);
  const [isUploadingTesti, setIsUploadingTesti] = useState(false);
  const [testiName, setTestiName] = useState('');
  const [testiQuote, setTestiQuote] = useState('');
  const [testiRating, setTestiRating] = useState('5');
  // --- NEW: Service Type State for Testimonials ---
  const [testiService, setTestiService] = useState('General'); 

  useEffect(() => {
    fetchGallery();
    fetchAchievements();
    fetchMessages(); 
    fetchTestimonials(); 
    window.scrollTo(0, 0);
  }, []);

  // --- LOGOUT FUNCTION ---
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // --- FETCH FUNCTIONS ---
  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      items.sort((a, b) => b.createdAt - a.createdAt);
      setMessages(items);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

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
      items.sort((a, b) => b.createdAt - a.createdAt);
      setAchievements(items);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      items.sort((a, b) => b.createdAt - a.createdAt);
      setTestimonials(items);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  // --- DELETE MESSAGE FUNCTION ---
  const handleDeleteMessage = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteDoc(doc(db, "messages", itemId));
      setMessages(messages.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Delete failed.");
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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (!data.secure_url) throw new Error("Cloudinary upload failed");
      
      await addDoc(collection(db, "achievements"), {
        title: achTitle,
        description: achDesc,
        imageUrl: data.secure_url,
        createdAt: Date.now() 
      });

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

  // --- UPDATED: TESTIMONIAL SUBMIT FUNCTION ---
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    
    if (!testiName || !testiQuote) {
      return alert("Please provide a patient name and quote.");
    }

    setIsUploadingTesti(true);
    try {
      // NOW SAVES THE SPECIFIC SERVICE TO FIREBASE
      await addDoc(collection(db, "testimonials"), {
        name: testiName,
        quote: testiQuote,
        rating: parseInt(testiRating),
        service: testiService, 
        createdAt: Date.now() 
      });

      setTestiName('');
      setTestiQuote('');
      setTestiRating('5');
      setTestiService('General'); // Reset back to default
      await fetchTestimonials();
    } catch (error) {
      alert("Failed to save testimonial.");
      console.error(error);
    }
    setIsUploadingTesti(false);
  };

  const handleDeleteTestimonial = async (itemId) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteDoc(doc(db, "testimonials", itemId));
      setTestimonials(testimonials.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
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
              <button 
                onClick={handleLogout}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-slate-800 transition-all"
              >
                Logout
              </button>
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
                
                {/* --- 5 FULLY FUNCTIONAL TABS --- */}
                <button onClick={() => setActiveTab('overview')} className={`flex items-center px-4 py-3 rounded-2xl font-medium text-left transition-all ${activeTab === 'overview' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}>
                  <span className="mr-3 text-lg">📊</span> Overview
                </button>
                <button onClick={() => setActiveTab('inbox')} className={`flex items-center px-4 py-3 rounded-2xl font-medium text-left transition-all ${activeTab === 'inbox' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}>
                  <span className="mr-3 text-lg">📥</span> Inbox
                </button>
                <button onClick={() => setActiveTab('gallery')} className={`flex items-center px-4 py-3 rounded-2xl font-medium text-left transition-all ${activeTab === 'gallery' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}>
                  <span className="mr-3 text-lg">🖼️</span> Gallery Manager
                </button>
                <button onClick={() => setActiveTab('achievements')} className={`flex items-center px-4 py-3 rounded-2xl font-medium text-left transition-all ${activeTab === 'achievements' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}>
                  <span className="mr-3 text-lg">🏆</span> Achievements
                </button>
                <button onClick={() => setActiveTab('testimonials')} className={`flex items-center px-4 py-3 rounded-2xl font-medium text-left transition-all ${activeTab === 'testimonials' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}>
                  <span className="mr-3 text-lg">⭐</span> Testimonials
                </button>

              </nav>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex-grow bg-white/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-[0_15px_35px_0_rgba(31,38,135,0.1)] min-h-[600px]">
            
            {/* --- OVERVIEW TAB --- */}
            {activeTab === 'overview' && (
              <div className="animate-in fade-in duration-500">
                <div className="mb-8 border-b border-white/40 pb-6">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Command Center</h2>
                  <p className="text-slate-600">Welcome back. Here is your clinic's digital snapshot.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                  <div className="bg-white/60 p-6 rounded-3xl border border-white/80 shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl mb-2">📥</span>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{messages.length}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Inquiries</p>
                  </div>
                  <div className="bg-white/60 p-6 rounded-3xl border border-white/80 shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl mb-2">🖼️</span>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{galleryItems.length}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Gallery Media</p>
                  </div>
                  <div className="bg-white/60 p-6 rounded-3xl border border-white/80 shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl mb-2">🏆</span>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{achievements.length}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Milestones</p>
                  </div>
                  <div className="bg-white/60 p-6 rounded-3xl border border-white/80 shadow-sm flex flex-col justify-center items-center text-center">
                    <span className="text-3xl mb-2">⭐</span>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{testimonials.length}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Reviews</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Patient Requests</h3>
                <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm overflow-hidden">
                  {messages.length > 0 ? (
                    <div className="divide-y divide-white/60">
                      {messages.slice(0, 3).map((msg) => (
                        <div key={msg.id} className="p-6 hover:bg-white/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-slate-800">{msg.name}</p>
                            <p className="text-sm text-violet-600 font-medium">{msg.service}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full inline-block mb-2">
                              {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'New'}
                            </p>
                            <p className="text-sm text-slate-500">{msg.mobile}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 text-center text-slate-500 font-medium">No recent requests.</div>
                  )}
                  {messages.length > 3 && (
                    <div className="p-4 bg-white/60 text-center border-t border-white/60">
                      <button onClick={() => setActiveTab('inbox')} className="text-sm font-bold text-violet-600 hover:text-violet-800">
                        View All in Inbox →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- INBOX TAB --- */}
            {activeTab === 'inbox' && (
              <div className="animate-in fade-in duration-500">
                <div className="mb-8 border-b border-white/40 pb-6 flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Patient Inbox</h2>
                    <p className="text-slate-600">Backup of all appointment requests from the website.</p>
                  </div>
                  <div className="bg-violet-100 text-violet-800 px-4 py-1.5 rounded-full font-bold text-sm">
                    {messages.length} Requests
                  </div>
                </div>

                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-white/60 p-6 rounded-2xl border border-white/80 shadow-sm relative group">
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)} 
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors text-lg" 
                        title="Delete Message"
                      >
                        🗑️
                      </button>
                      
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2 pr-8">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{msg.name}</h3>
                          <p className="text-sm font-medium text-violet-600">{msg.service} • {msg.mode}</p>
                        </div>
                        <div className="text-xs font-bold text-slate-500 bg-white/50 border border-slate-200 px-3 py-1 rounded-full w-max shadow-sm">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Date Unknown'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm bg-white/40 p-4 rounded-xl border border-slate-100">
                        <div><span className="text-slate-500 block mb-1">Phone Number</span> <a href={`tel:${msg.mobile}`} className="font-semibold text-slate-800 hover:text-violet-600">{msg.mobile}</a></div>
                        <div><span className="text-slate-500 block mb-1">Email Address</span> <a href={`mailto:${msg.email}`} className="font-semibold text-slate-800 hover:text-violet-600">{msg.email}</a></div>
                        <div className="col-span-1 md:col-span-2"><span className="text-slate-500 block mb-1">Reference Source</span> <span className="font-medium text-slate-800">{msg.reference || 'None provided'}</span></div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Patient Message</span>
                        <p className="text-slate-700 bg-white/40 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  
                  {messages.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl bg-white/30">
                      <span className="text-4xl block mb-4">📭</span>
                      <p className="text-slate-600 font-bold text-xl mb-2">Your inbox is empty</p>
                      <p className="text-slate-500 text-sm">New patient requests from the website will appear here automatically.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

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

            {/* --- UPDATED TESTIMONIALS TAB --- */}
            {activeTab === 'testimonials' && (
              <div className="animate-in fade-in duration-500">
                <div className="mb-8 border-b border-white/40 pb-6">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Testimonials Manager</h2>
                  <p className="text-slate-600">Add patient reviews to display on the public website.</p>
                </div>

                <form onSubmit={handleTestimonialSubmit} className="bg-white/50 p-6 md:p-8 rounded-3xl border border-white/60 shadow-sm mb-10">
                  <h3 className="text-xl font-bold text-violet-900 mb-6">Add New Patient Review</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Patient Name</label>
                      <input 
                        type="text" 
                        value={testiName}
                        onChange={(e) => setTestiName(e.target.value)}
                        placeholder="e.g., A. Sharma" 
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Star Rating</label>
                      <select 
                        value={testiRating}
                        onChange={(e) => setTestiRating(e.target.value)}
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all cursor-pointer"
                      >
                        <option value="5">⭐⭐⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                      </select>
                    </div>
                    {/* --- NEW: SERVICE SELECTION DROPDOWN --- */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Related Service</label>
                      <select 
                        value={testiService}
                        onChange={(e) => setTestiService(e.target.value)}
                        className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all cursor-pointer"
                      >
                        <option value="General">General / All Services</option>
                        <option value="Individual, Group & Family Therapy">Individual, Group & Family Therapy</option>
                        <option value="Assessment & Diagnosis">Assessment & Diagnosis</option>
                        <option value="Mental Health Counselling">Mental Health Counselling</option>
                        <option value="Specialized Programs">Specialized Programs</option>
                        <option value="Career Guidance">Career Guidance</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Patient Quote</label>
                    <textarea 
                      value={testiQuote}
                      onChange={(e) => setTestiQuote(e.target.value)}
                      placeholder="Paste the patient's review here..." 
                      rows="3"
                      className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isUploadingTesti}
                    className={`w-full font-bold py-3.5 rounded-xl transition-all shadow-md ${isUploadingTesti ? 'bg-slate-400 text-white cursor-not-allowed' : 'bg-violet-700 hover:bg-violet-800 text-white'}`}
                  >
                    {isUploadingTesti ? 'Saving Data...' : '+ Publish Review'}
                  </button>
                </form>

                <h3 className="text-xl font-bold text-slate-800 mb-6">Current Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((item) => (
                    <div key={item.id} className="bg-white/40 p-6 rounded-2xl border border-white/60 shadow-sm relative group overflow-hidden">
                      <button 
                        onClick={() => handleDeleteTestimonial(item.id)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors z-10"
                        title="Delete"
                      >
                        🗑️
                      </button>
                      
                      {/* --- NEW: SERVICE BADGE --- */}
                      <div className="inline-block px-3 py-1 mb-3 bg-violet-100 text-violet-700 text-xs font-bold rounded-full">
                        {item.service || 'General'}
                      </div>

                      <div className="mb-2 text-yellow-500 text-sm">
                        {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                      </div>
                      <p className="text-slate-700 italic mb-4 text-sm leading-relaxed">"{item.quote}"</p>
                      <h4 className="font-bold text-slate-900">— {item.name}</h4>
                    </div>
                  ))}
                  
                  {testimonials.length === 0 && !isUploadingTesti && (
                    <div className="col-span-1 md:col-span-2 text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
                      <p className="text-slate-500">No testimonials published yet.</p>
                    </div>
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

export default Dash;