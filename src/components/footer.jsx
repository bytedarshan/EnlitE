import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-200 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">EnlitE Energizing Wellness Clinic</h3>
          <p className="text-sm text-slate-400 mb-2">Empowering individuals, families, and communities to achieve mental wellness.</p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4 text-white">Contact Information</h4>
          <address className="not-italic text-sm space-y-2">
            <p>KHAMADHENU HOUSE, Door No: 11/5, First Floor,</p>
            <p>Gandhi Avenue Street, Purasawalkam,</p>
            <p>Chennai - 600084.</p>
            <p className="pt-2"><strong>Mob No:</strong> +91 98840 27755</p>
            <p><strong>Email Id:</strong> enlitecpp@gmail.com</p>
          </address>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-700 text-sm text-center text-slate-400">
        &copy; {new Date().getFullYear()} EnlitE Energizing Wellness Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;