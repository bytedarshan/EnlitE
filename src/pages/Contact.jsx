import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-violet-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-medium text-slate-800 mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-600">Appointments are based on telephonic calls. Reach out to us below.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-medium text-slate-800 mb-6">Book an Appointment</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input type="text" id="name" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                  <input type="tel" id="mobile" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" id="email" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white" placeholder="your@email.com" />
              </div>

              {/* Service Dropdown */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">Required Service</label>
                <select id="service" defaultValue="" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white text-slate-700 cursor-pointer">
                  <option value="" disabled>Select a service...</option>
                  <option value="therapy">Individual, Group & Family Therapy</option>
                  <option value="assessment">Assessment & Diagnosis</option>
                  <option value="counselling">Mental Health Counselling</option>
                  <option value="specialized">Specialized Programs</option>
                  <option value="career">Career Guidance</option>
                </select>
              </div>

              {/* Meeting Mode Dropdown */}
              <div>
                <label htmlFor="meetingMode" className="block text-sm font-medium text-slate-700 mb-1">Meeting Mode</label>
                <select id="meetingMode" defaultValue="" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors bg-white text-slate-700 cursor-pointer">
                  <option value="" disabled>Select meeting mode...</option>
                  <option value="clinic">In-Clinic Visit</option>
                  <option value="online">Online Consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Additional Message</label>
                <textarea id="message" rows="4" className="w-full border border-slate-300 rounded-md p-3 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors resize-none bg-white" placeholder="How can we help you?"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-violet-600 text-white font-medium py-3 px-4 rounded-md hover:bg-violet-700 transition-colors duration-300">
                Book Appointment
              </button>
            </form>
          </motion.div>

          {/* Info Section */}
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