import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecommendationScreen from './RecommendationScreen';

const questions = [
  { id: 'flightType', type: 'choice', question: "What is the primary purpose of your travel?", options: ["Business", "Leisure", "Mixed Use"] },
  { id: 'departure', type: 'text', question: "Where is your primary departure base?", placeholder: "City or Airport Code" },
  { id: 'range', type: 'choice', question: "What is your typical flight range?", options: ["Under 3 Hours", "3 - 6 Hours", "6 - 10 Hours", "10+ Hours (Intercontinental)"] },
  { id: 'passengers', type: 'choice', question: "How many passengers typically travel with you?", options: ["1 - 4 Passengers", "5 - 8 Passengers", "9 - 14 Passengers", "15+ Passengers"] },
  { id: 'cabin', type: 'choice', question: "What are your core cabin requirements?", options: ["Standard Configuration", "Master Suite", "Conference Group", "Maximum Cargo"] },
  { id: 'frequency', type: 'choice', question: "What is your estimated annual flight volume?", options: ["Under 50 Hours", "50 - 150 Hours", "150 - 300 Hours", "300+ Hours"] },
  { id: 'budget', type: 'choice', question: "What is your anticipated acquisition budget?", options: ["Under $10M", "$10M - $25M", "$25M - $50M", "$50M+"] },
  { id: 'timeline', type: 'choice', question: "What is your purchasing timeline?", options: ["Immediately", "0 - 6 Months", "6 - 12 Months", "Just Exploring"] },
  { id: 'contact', type: 'text', question: "Where should we send your dossier?", placeholder: "Email Address" },
  { id: 'note', type: 'text', question: "Any additional requirements or preferences?", placeholder: "Optional notes..." }
];

export default function QualificationFlow() {
  const [currentStep, setCurrentStep] = useState(1); // 1 to 10
  const [answers, setAnswers] = useState({});
  const [textInput, setTextInput] = useState('');

  const currentQ = questions[currentStep - 1];

  const handleSelect = (option) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: option }));
    if (currentStep < 10) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setTextInput(''); // reset input for next text step just in case
      }, 400);
    } else {
      // Complete
      setTimeout(() => {
        setCurrentStep(11);
      }, 400);
    }
  };

  const handleNextText = () => {
    handleSelect(textInput);
  };

  if (currentStep > 10) {
    return <RecommendationScreen answers={answers} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#FCFCFD] font-sans selection:bg-slate-200 selection:text-slate-900">
      
      {/* Header: Back Button & Progress */}
      <header className="absolute top-0 left-0 w-full z-50 p-6 md:px-16 md:py-10 flex flex-col gap-6">
        <div className="flex justify-between items-center w-full">
          {currentStep > 1 ? (
            <button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="group flex items-center text-[#0A192F]/60 hover:text-[#0A192F] transition-colors text-xs font-semibold tracking-widest uppercase cursor-pointer"
            >
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Back
            </button>
          ) : (
            <div /> // spacer
          )}
          
          <div className="text-[#0A192F]/40 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
            Step {currentStep} of 10
          </div>
        </div>
        
        {/* Minimal Progress Bar */}
        <div className="w-full h-[1px] bg-slate-200 overflow-hidden">
          <motion.div 
            className="h-full bg-[#0A192F]"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 10) * 100}%` }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pt-32 pb-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl flex flex-col items-center text-center"
          >
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light text-[#0A192F] tracking-tight mb-16 leading-[1.2]">
              {currentQ.question}
            </h2>

            {currentQ.type === 'choice' ? (
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 w-full">
                {currentQ.options.map(option => {
                  const isSelected = answers[currentQ.id] === option;
                  return (
                    <motion.button
                      key={option}
                      onClick={() => handleSelect(option)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full sm:w-auto min-w-[220px] px-8 py-6 border transition-all duration-500 ease-out flex items-center justify-center
                        text-xs md:text-sm font-medium tracking-[0.1em] uppercase cursor-pointer rounded-sm
                        ${isSelected 
                          ? "bg-[#0A192F] border-[#0A192F] text-white shadow-[0_10px_30px_rgba(10,25,47,0.15)]" 
                          : "bg-white border-slate-200 text-[#0A192F] hover:border-[#0A192F]/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
                        }
                      `}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center w-full max-w-lg gap-10">
                <input 
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="w-full bg-transparent border-b border-slate-300 px-4 py-4 text-[#0A192F] text-2xl md:text-3xl outline-none focus:border-[#0A192F] transition-colors placeholder:text-slate-300 text-center font-light"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && textInput.trim() !== '') handleNextText();
                  }}
                  autoFocus
                />
                <motion.button
                  onClick={handleNextText}
                  disabled={!textInput.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#0A192F] text-white px-10 py-4 rounded-full text-xs md:text-sm font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:shadow-lg"
                >
                  {currentStep === 10 ? "Submit Profile" : "Continue"}
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}