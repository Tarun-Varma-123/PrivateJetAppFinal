import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Logic
const determineAircraft = (answers) => {
  const paxStr = answers.passengers || "";
  const rangeStr = answers.range || "";
  
  if (paxStr.includes("15+") || rangeStr.includes("10+ Hours")) {
    return {
      class: "Heavy / Ultra Long Range",
      name: "Gulfstream G650",
      specs: { range: "7,000 nm", speed: "Mach 0.925", capacity: "Up to 19", volume: "2,138 cu ft" },
      image: "/aircraft_exterior.png"
    };
  }
  
  if (paxStr.includes("9 - 14") || rangeStr.includes("6 - 10 Hours")) {
    return {
      class: "Super Midsize",
      name: "Challenger 350",
      specs: { range: "3,200 nm", speed: "Mach 0.83", capacity: "Up to 10", volume: "860 cu ft" },
      image: "/aircraft_exterior.png"
    };
  }
  
  return {
    class: "Light Jet",
    name: "Phenom 300E",
    specs: { range: "2,010 nm", speed: "Mach 0.80", capacity: "Up to 8", volume: "324 cu ft" },
    image: "/aircraft_exterior.png"
  };
};

const texts = [
  "Structuring mission data...",
  "Optimizing aircraft selection...",
  "Finalizing concierge brief..."
];

export default function RecommendationScreen({ answers }) {
  const [analyzing, setAnalyzing] = useState(true);
  const [loadingText, setLoadingText] = useState(texts[0]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < texts.length) {
        setLoadingText(texts[current]);
      }
    }, 800); // 3 steps * 800 ~= 2400ms

    const timeout = setTimeout(() => {
      setAnalyzing(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const aircraft = determineAircraft(answers);
  const userEmail = answers.contact || "your provided email";

  if (analyzing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center apple-glass-dark bg-aerospace-navy/80 text-titanium-silver">
        {/* 1px circular loader */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 rounded-full border-[1px] border-white/20 border-t-crisp-white mb-8"
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg tracking-wide font-light"
          >
            {loadingText}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, backgroundColor: "#0A0A14" }}
      animate={{ opacity: 1, backgroundColor: "#F5F5F7" }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full flex flex-col lg:flex-row text-space-gray overflow-hidden"
    >
      {/* Left 55% Visual */}
      <div className="w-full lg:w-[55%] h-[50vh] lg:h-screen relative overflow-hidden">
        <motion.div 
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${aircraft.image})` }}
        />
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Right 45% Details */}
      <div className="w-full lg:w-[45%] bg-titanium-silver flex flex-col justify-center px-10 py-16 lg:p-20 z-10">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-sm tracking-[0.2em] text-space-gray/60 font-semibold mb-4 uppercase"
        >
          Mission Profile Recommendation
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-5xl md:text-6xl font-semibold tracking-tight text-space-gray mb-12"
        >
          {aircraft.name}
        </motion.h1>

        {/* Spec Grid */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-8 mb-16">
          {[
            { label: "Max Range", value: aircraft.specs.range },
            { label: "Cruising Speed", value: aircraft.specs.speed },
            { label: "Passenger Capacity", value: aircraft.specs.capacity },
            { label: "Cabin Volume", value: aircraft.specs.volume }
          ].map((spec, index) => (
            <motion.div 
              key={spec.label}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7 + (index * 0.1) }}
              className="flex flex-col"
            >
              <span className="text-xs tracking-wider uppercase text-space-gray/50 mb-1 font-medium">{spec.label}</span>
              <span className="text-xl font-medium text-space-gray">{spec.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Hand-off Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          className="border border-space-gray/10 bg-white p-8 rounded-2xl shadow-sm"
        >
          <h3 className="text-lg font-semibold text-space-gray mb-3 tracking-tight">Profile Handed Off to Concierge</h3>
          <p className="text-space-gray/70 text-sm leading-relaxed font-light">
            Your mission profile and aircraft preference have been successfully transmitted to our senior aviation brokerage team. A dedicated advisor will review your requirements and contact you within 12 hours at <strong className="font-medium text-space-gray">{userEmail}</strong> to discuss current fleet availability and market pricing.
          </p>
        </motion.div>
        
      </div>
    </motion.div>
  );
}