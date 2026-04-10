import React from 'react';
import { motion } from 'framer-motion';

// Import the image
import roshniImage from '../data/images/roshni_suresh.jpeg';

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const tileHover = {
    hover: { 
      y: -6, 
      scale: 1.02, 
      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 350, damping: 20 }
    }
  };

  return (
    <div className="bg-violet-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Full Philosophy Section */}
        <motion.section initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8 md:mb-10 border-b-2 border-violet-200 pb-6">
            Our Philosophy
          </h1>
          {/* Changed typography to be responsive: text-base on mobile, scaling up to text-xl on large screens */}
          <div className="text-slate-700 leading-relaxed md:leading-loose space-y-6 text-base md:text-lg lg:text-xl">
            <p>EnlitE Energizing Wellness Clinic has been started on the requirement of counselling as a treatment for various illness/diseases in the rural areas. Our counselling treatment in the initial phase gave a remarkable outcome in the life of the people with better lifestyle, rich attitude, positive mental health & thoughts and wide range of ability & skills in handling stressful situations with more self-confidence.</p>
            <p>We believe that mental health is just as important as physical health. Our mission is to provide a safe, supportive, and non-judgemental space for individuals, families, and communities to achieve emotional wellness and resilience. Also, EnlitE aims to convey a sense of warmth, professionalism, and expertise, while also highlighting the clinic’s unique approach and services.</p>
            <p>On the other hand, help people in handling their situations with more natural lifestyle modification and behavioural modification (i.e., restructuring the attitude of individual/s) than with medical analysis and medical treatment. Our service is more personalized and highly confidential in the treatment of the individual/s.</p>
            <p>We understand that every person’s journey is unique, and we’re committed to delivering personalized, evidence-based psychological services that address your specific needs and goals. Our team of experienced psychologists and therapists work collaboratively with you to develop a tailored treatment plan that empowers you to thrive.</p>
            <p className="font-medium text-violet-800 italic">The vision serves as a foundation for building a compassionate, effective, and innovative clinic.</p>
          </div>
        </motion.section>

        {/* Founder Profile Section */}
        {/* Adjusted padding: p-6 on mobile to give text more room, p-12 on desktop */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-violet-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
            
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-violet-50">
                <motion.img 
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={roshniImage} 
                  alt="Dr. Roshni Suresh" 
                  className="w-full h-auto object-cover object-center" 
                />
              </div>
              <div className="mt-6 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-slate-900">Dr. Roshni Suresh</h3>
                <p className="text-violet-700 font-bold mb-1">Founder & Director</p>
                <p className="text-slate-600 text-sm font-medium">Consultant Clinical Psychologist<br/>Psychotherapist & Hypnotherapist</p>
                <div className="mt-5 pt-5 border-t border-slate-100 text-sm text-slate-600 space-y-3">
                  <p className="flex items-center justify-center lg:justify-start gap-3"><span className="text-xl">📍</span> Purasawalkam, Chennai, TamilNadu</p>
                  <p className="flex items-center justify-center lg:justify-start gap-3"><span className="text-xl">✉️</span> enlitecpp@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Changed from prose-lg to prose-base md:prose-lg for responsive scaling */}
            <div className="lg:col-span-8 prose prose-slate prose-base md:prose-lg max-w-none text-slate-700">
              <h2 className="text-3xl font-bold text-slate-900 mt-0 mb-6">Professional Profile</h2>
              
              {/* Animated Highlight Badges */}
              <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                {[
                  "8+ Years Experience",
                  "PhD Clinical Psychology",
                  "English, Hindi & Tamil"
                ].map((badge, index) => (
                  <motion.span 
                    key={index}
                    whileHover={{ 
                      y: -4,        
                      scale: 1.08,  
                      boxShadow: "0 10px 15px -3px rgba(91, 33, 182, 0.2)" 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 350,  
                      damping: 15,
                      mass: 0.8
                    }}
                    className="bg-violet-100 text-violet-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold tracking-wide cursor-default"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>

              <p>Dr. Roshni Suresh is an experienced Clinical Psychologist, Counselling Psychologist, Psychotherapist, and Hypnotherapist offering professional therapy and counselling services in Chennai and for international clients, including Dubai and the UAE. With over 8 years of experience across clinical, educational, and corporate environments, she specializes in evidence-based mental health care, online therapy, and workplace counselling services.</p>
              <p>Her expertise includes Cognitive Behavioural Therapy (CBT), psychological assessments, trauma counselling, anxiety and depression treatment, relationship counselling, and stress management therapy. Dr. Roshni provides online counselling sessions for clients in Dubai, UAE, and globally, making mental health support accessible, confidential, and culturally sensitive.</p>
              <p>She has extensive experience supporting children, adolescents, and working professionals, addressing concerns such as academic stress, workplace burnout, emotional regulation, marital and relationship issues, and personal development. Known for her empathetic and structured approach, she creates a safe, inclusive, and results-oriented therapeutic environment aligned with international counselling and psychotherapy standards.</p>
              <p>Currently working as a Consultant Clinical Psychologist at PRIDE Superspecialist Hospital, she delivers individual therapy, crisis intervention, and mental health assessments while collaborating with multidisciplinary healthcare teams. She has also worked as a Corporate Psychologist in the UAE-focused corporate model, leading Employee Assistance Programs (EAP), corporate wellness programs, and mental health workshops for organizations.</p>
              <p>As the Founder of EnlitE Energizing Wellness Clinic, Dr. Roshni offers private counselling, psychotherapy, and online therapy services for international clients, focusing on anxiety therapy, depression counselling, trauma recovery, and emotional wellbeing coaching. She also conducts mental health awareness programs, corporate training, and psychological workshops tailored for schools, colleges, and organizations.</p>
              <p>Her academic qualifications include a PhD in Clinical Psychology and Psychotherapy, along with advanced certifications in CBT therapy, psychodiagnostics, and child and adolescent mental health. She is also a published researcher in the field of CBT interventions for emotional intelligence and student development.</p>
              <p>Dr. Roshni has been recognized with multiple international awards for her contribution to mental health awareness, counselling excellence, and global psychological services. She is fluent in English, Hindi, and Tamil, enabling her to work effectively with diverse and multicultural clients across India, Dubai, and internationally.</p>
              <p className="font-medium text-violet-800 border-l-4 border-violet-400 pl-4 mt-8">With a strong commitment to accessible and high-quality mental health care, Dr. Roshni Suresh provides online therapy, counselling services in Dubai, and global mental health support, helping individuals achieve emotional balance, resilience, and long-term psychological wellbeing.</p>
            </div>
          </div>
        </motion.section>

        {/* Vision Banner */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="bg-violet-800 text-white p-10 md:p-16 rounded-3xl shadow-xl text-center cursor-default"
        >
          <h2 className="text-3xl font-medium mb-6 text-violet-100 italic">Our Vision</h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-light max-w-5xl mx-auto leading-tight">
            "Empowering individuals, families, and communities to achieve mental wellness and resilience through compassionate, evidence-based psychological services."
          </p>
        </motion.section>

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
                  variants={tileHover} 
                  whileHover="hover"
                  className="bg-white p-6 sm:p-8 rounded-2xl border-l-8 border-violet-500 shadow-md cursor-pointer"
                >
                  <strong className="text-violet-800 text-xl sm:text-2xl block mb-2">{value.title}</strong>
                  <span className="text-slate-600 text-base sm:text-lg leading-relaxed">{value.desc}</span>
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
                  variants={tileHover}
                  whileHover="hover"
                  className="flex items-center bg-violet-100 p-6 sm:p-8 rounded-2xl border border-violet-200 shadow-sm cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ scale: 1.3, backgroundColor: "#4C1D95" }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="h-4 w-4 bg-violet-600 rounded-full mr-4 sm:mr-6 flex-shrink-0"
                  ></motion.div>
                  <span className="text-slate-800 text-lg sm:text-xl font-medium">{goal}</span>
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