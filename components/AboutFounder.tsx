
import React, { useState } from 'react';
import ContactModal from './ContactModal';

interface AboutFounderProps {
  onNavigate: (page: string) => void;
}

const AboutFounder: React.FC<AboutFounderProps> = ({ onNavigate }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 animate-soothing">
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      
      <div className="mb-40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24 border-b border-slate-100 pb-20">
          <div className="max-w-4xl">
            <span className="text-blue-600 font-black tracking-[0.5em] text-[10px] uppercase mb-8 block px-6 py-2 bg-blue-50 w-fit rounded-full">Student Researcher & Architect</span>
            <h1 className="text-8xl font-bold text-slate-950 tracking-tighter leading-tight font-serif italic">
              Amogh Kadadi
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Creator</p>
            <p className="text-xl font-bold text-slate-950 tracking-tight">SACA Cognitive Research</p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-8">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] block">Core Philosophy</span>
              <p className="text-5xl font-serif italic text-slate-900 leading-[1.2] tracking-tight">
                "Cognitive potential is not a static inheritance, but a dynamic architecture that matures through rigorous observation and intentional conditioning."
              </p>
            </div>

            <div className="space-y-10 text-xl text-slate-500 font-medium leading-relaxed border-l-4 border-slate-50 pl-12">
              <p>
                Amogh Kadadi is a 15-year-old student and systems architect driven by a fascination with the boundaries of human intelligence. His work focuses on the intersection of psychometrics and adaptive neural modeling, seeking to replace the anxiety of traditional IQ testing with a calm, institutional environment for self-discovery.
              </p>
              <p>
                As a student, Amogh approaches SACA as an ongoing research project. He believes that the most effective way to understand the mind is to map its architecture with empirical honesty. By utilizing Large Language Models to synthesize behavioral data, he aims to provide parents and adults with a high-fidelity view of cognitive growth—one that accounts for nuances like processing speed and domain-specific logic.
              </p>
              <p>
                His commitment to data integrity and cognitive science ensures that SACA remains a serious, hype-free space for intellectual development. He invites users to move beyond the single number of an IQ score and instead engage with the daily discipline of cognitive expansion.
              </p>
            </div>

            <div className="p-12 bg-slate-950 rounded-[60px] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Reason for Existence</span>
                <p className="text-3xl font-serif italic leading-snug text-white/90">
                  To provide a standardized, institutional-grade gateway for quantifying and improving cognitive performance in the digital age.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
            <div className="aspect-[4/5] bg-slate-950 rounded-[70px] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] relative border-[12px] border-white group">
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 p-16 text-center">
                 <div className="w-40 h-40 bg-blue-600 rounded-[45px] flex items-center justify-center text-6xl font-serif text-white mb-12 group-hover:scale-105 transition-transform duration-1000 shadow-2xl shadow-blue-500/30">
                   AK
                 </div>
                 <div className="space-y-4">
                   <h3 className="text-4xl font-bold text-white tracking-tight">Amogh Kadadi</h3>
                   <div className="flex flex-col items-center gap-2">
                     <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.5em]">15-Year-Old Student</span>
                     <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">Lead Protocol Architect</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFounder;
