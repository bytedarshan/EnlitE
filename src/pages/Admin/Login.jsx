import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// WE IMPORTED TWO NEW TOOLS HERE: setPersistence and browserSessionPersistence
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../firebase';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Force Firebase to "forget" the user when the tab closes
      await setPersistence(auth, browserSessionPersistence);
      
      // 2. Proceed with standard login
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/admin'); 
    } catch (err) {
      setError('Invalid email or password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center relative overflow-hidden p-4">
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-violet-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse delay-1000 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/40 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/60 shadow-[0_15px_35px_0_rgba(31,38,135,0.1)] relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">EnlitE <span className="text-violet-600 font-light">Portal</span></h2>
          <p className="text-slate-600 mt-2 text-sm">Secure access for authorized personnel only.</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium mb-6 text-center border border-red-100">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/60 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full font-bold py-3.5 rounded-xl transition-all shadow-md ${isLoading ? 'bg-slate-400 text-white' : 'bg-violet-700 hover:bg-violet-800 text-white'}`}
          >
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;