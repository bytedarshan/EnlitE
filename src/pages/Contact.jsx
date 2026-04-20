import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { db } from '../firebase'; // <-- Import Firebase
import { collection, addDoc } from 'firebase/firestore'; // <-- Import Firestore tools

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle');

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const serviceID = 'service_n29sg3c'; 
    const templateID = 'template_agysbr6';
    const publicKey = '80hk1SJWU3mrnF0b7';

    // 1. Capture the form data BEFORE the form resets
    const formData = new FormData(form.current);
    const appointmentData = {
      name: formData.get('user_name'),
      mobile: formData.get('user_mobile'),
      email: formData.get('user_email'),
      service: formData.get('service_required'),
      mode: formData.get('meeting_mode'),
      reference: formData.get('reference_source') || 'None provided',
      message: formData.get('message'),
      createdAt: Date.now()
    };

    try {
      // 2. Send the Email via EmailJS
      await emailjs.sendForm(serviceID, templateID, form.current, publicKey);
      
      // 3. Save a backup copy to the Firebase Dashboard
      await addDoc(collection(db, "messages"), appointmentData);

      setStatus('success');
      form.current.reset(); 
      setTimeout(() => setStatus('idle'), 5000); 

    } catch (error) {
      console.error("Submission failed:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-violet-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-600">Appointments are based on telephonic calls. Reach out to us below.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-medium text-slate-800 mb-6">Book an Appointment</h2>
            
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input type="text" name="user_name" id="user_name" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="user_mobile" className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                  <input type="tel" name="user_mobile" id="user_mobile" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" name="user_email" id="user_email" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white" placeholder="your@email.com" />
              </div>

              <div>
                <label htmlFor="service_required" className="block text-sm font-medium text-slate-700 mb-1">Required Service</label>
                <select name="service_required" id="service_required" required defaultValue="" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white text-slate-700 cursor-pointer">
                  <option value="" disabled>Select a service...</option>
                  <option value="Individual, Group & Family Therapy">Individual, Group & Family Therapy</option>
                  <option value="Assessment & Diagnosis">Assessment & Diagnosis</option>
                  <option value="Mental Health Counselling">Mental Health Counselling</option>
                  <option value="Specialized Programs">Specialized Programs</option>
                  <option value="Career Guidance">Career Guidance</option>
                </select>
              </div>

              <div>
                <label htmlFor="meeting_mode" className="block text-sm font-medium text-slate-700 mb-1">Meeting Mode</label>
                <select name="meeting_mode" id="meeting_mode" required defaultValue="" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white text-slate-700 cursor-pointer">
                  <option value="" disabled>Select meeting mode...</option>
                  <option value="In-Clinic Visit">In-Clinic Visit</option>
                  <option value="Online Consultation">Online Consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="reference_source" className="block text-sm font-medium text-slate-700 mb-1">Reference (How did you hear about us?)</label>
                <input type="text" name="reference_source" id="reference_source" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white" placeholder="e.g., Google, Practo, Friend's Name" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Additional Message</label>
                <textarea name="message" id="message" rows="4" required className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors resize-none bg-white" placeholder="How can we help you?"></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className={`w-full text-white font-medium py-3 px-4 rounded-md transition-all duration-300 ${
                  status === 'success' ? 'bg-green-600 hover:bg-green-700' :
                  status === 'error' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-violet-600 hover:bg-violet-700 disabled:opacity-70'
                }`}
              >
                {status === 'sending' ? 'Sending...' : 
                 status === 'success' ? 'Message Sent Successfully!' : 
                 status === 'error' ? 'Failed to Send. Try Again.' : 
                 'Book Appointment'}
              </button>
            </form>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-medium text-slate-800 mb-4">Operation Hours</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li><strong className="text-slate-800">Days:</strong> Monday to Friday</li>
                <li><strong className="text-slate-800">Timings:</strong> 11:00 - 20:00 Hrs</li>
                <li><strong className="text-slate-800">Duration:</strong> 60 minutes per session</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h3 className="text-xl font-medium text-slate-800 mb-4">Fee Structure</h3>
              <ul className="text-slate-600 space-y-2 text-sm">
                <li className="flex justify-between border-b pb-2"><span>Registration Fee</span> <span>Rs. 500/=</span></li>
                <li className="flex justify-between border-b pb-2 pt-2"><span>Consultation Fee</span> <span>Rs. 1,000/=</span></li>
                <li className="flex justify-between border-b pb-2 pt-2"><span>Couple Consultation</span> <span>Rs. 1,500/=</span></li>
                <li className="flex justify-between pt-2"><span>Group Consultation <span className="text-xs text-slate-400 block">(Max 10 individuals)</span></span> <span>Rs. 5,000/=</span></li>
              </ul>
            </div>

            <div className="bg-violet-100 p-6 rounded-lg border border-violet-200">
              <h3 className="text-lg font-medium text-violet-900 mb-3">Important Notes</h3>
              <ul className="text-violet-800 space-y-2 text-sm list-disc pl-5">
                <li>Arrive 10-15 minutes early to complete any necessary paperwork.</li>
                <li>Please provide 24-hour notice for cancellations or rescheduling.</li>
                <li>All sessions are confidential, except in cases where disclosure is required by law.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;