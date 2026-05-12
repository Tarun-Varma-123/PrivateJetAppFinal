import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function LandingPage({ onStart }) {
  return (
    <div className="bg-[#020B1A] min-h-screen w-full font-sans text-white selection:bg-slate-700 selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-center px-6 md:px-16 overflow-hidden bg-[#020B1A]">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat scale-105"
          style={{ 
            backgroundImage: "url('/upscaled_user_bg.png')",
            backgroundPosition: "75% 50%"
          }}
        />
        {/* Soft, natural gradient to slightly darken the left side without creating hard edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020B1A]/80 via-[#020B1A]/30 to-transparent" />
        {/* Blend downwards into the next section */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-[#020B1A]" />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
          <div className="text-white font-sans text-xs tracking-[0.3em] uppercase opacity-80">
            {/* Branding removed as requested */}
          </div>
          <button className="text-sm font-light tracking-widest text-white uppercase hover:text-white/70 transition-colors">Menu</button>
        </nav>

        <div className="relative z-10 max-w-5xl mt-20">
          <motion.h1
            initial="hidden" animate="visible" variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-[5rem] font-light tracking-tight text-white mb-6 leading-[1.1]"
          >
            Discover the ideal private jet <br className="hidden md:block" /> for your next mission.
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-light text-white/90 max-w-2xl mb-12 leading-relaxed"
          >
            A concierge-style aviation experience designed to match discerning travelers with the right aircraft in under 60 seconds.
          </motion.p>
          <motion.div
            initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <button
              onClick={onStart}
              className="bg-white text-[#0A192F] px-8 py-4 rounded-full font-medium text-sm tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-500 ease-out cursor-pointer"
            >
              Start Your Flight Profile
            </button>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-32 px-6 md:px-16 bg-[#020B1A] relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-20">
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">Precision curation.</h2>
            <p className="text-slate-400 font-light text-lg">Three steps to your ideal flight profile.</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { num: "01", title: "Curated Questions", desc: "Answer a refined set of criteria regarding your mission, range, and cabin requirements." },
              { num: "02", title: "Tailored Recommendation", desc: "Our algorithm processes your inputs to identify the optimal aircraft class and models." },
              { num: "03", title: "Advisor Consultation", desc: "Speak directly with a private aviation advisor already equipped with your complete profile." }
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative flex flex-col p-8 md:p-10 group cursor-default bg-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out rounded-2xl overflow-hidden"
              >
                {/* Crisp permanent accent line at the top */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0A192F]" />
                
                <span className="text-6xl font-serif text-slate-200/60 mb-8 transition-transform duration-500 transform origin-left group-hover:scale-105 group-hover:translate-x-2">
                  {step.num}
                </span>
                <h3 className="text-xl text-[#0A192F] font-medium tracking-wide mb-4 relative z-10">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed relative z-10">
                  {step.desc}
                </p>
                {/* Elegant animated accent line that grows on hover */}
                <div className="absolute bottom-0 left-10 w-0 h-[2px] bg-[#0A192F] group-hover:w-16 transition-all duration-500 ease-out" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. AIRCRAFT VISUAL SECTION */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/light_luxury_showcase.png')" }}
        />
        {/* Cinematic dark overlay for pure legibility and premium feel */}
        <div className="absolute inset-0 bg-[#020B1A]/40" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#020B1A] to-transparent" />

        <div className="relative z-10 text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }} viewport={{ once: true }}
            className="text-white text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] uppercase mb-8 drop-shadow-2xl"
          >
            Uncompromised Luxury
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }} viewport={{ once: true }}
            className="w-24 h-[1px] bg-white/50 mx-auto"
          />
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="relative py-40 px-6 text-center overflow-hidden flex flex-col items-center justify-center bg-[#020B1A]">
        
        {/* Subtle abstract ambient particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Faint orb 1 */}
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[20%] w-64 h-64 bg-white/5 rounded-full filter blur-3xl opacity-60"
          />
          {/* Faint orb 2 */}
          <motion.div 
            animate={{ x: [0, -40, 0], y: [0, 50, 0] }} 
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[20%] w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl opacity-60"
          />
          {/* Tiny drifting ambient dots */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-12"
          >
            Private aviation, <br className="hidden md:block" /> tailored to your mission.
          </motion.h2>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={onStart}
              className="bg-white text-[#0A192F] px-10 py-4 rounded-full font-medium tracking-wide hover:scale-105 hover:bg-slate-100 transition-all duration-500 ease-out shadow-[0_10px_40px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              Begin Your Flight Profile
            </button>
            <button
              className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-full font-light tracking-wide hover:bg-white/10 hover:border-white/70 transition-all duration-500 ease-out cursor-pointer"
            >
              View Fleet
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center bg-[#020B1A] border-t border-white/5 text-xs font-light tracking-widest text-slate-500 uppercase">
        <span>&copy; {new Date().getFullYear()} Private Aviation Concierge.</span>
        <span className="mt-4 md:mt-0">All Rights Reserved.</span>
      </footer>
    </div>
  );
}