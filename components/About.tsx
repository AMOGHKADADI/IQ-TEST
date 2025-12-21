
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <div className="text-center mb-32">
        <span className="text-blue-600 font-black tracking-[0.5em] text-[10px] uppercase mb-8 block px-6 py-2 bg-blue-50 rounded-full w-fit mx-auto border border-blue-100 shadow-sm">Architectural Blueprint</span>
        <h1 className="text-8xl font-bold text-slate-950 mb-10 tracking-tighter leading-tight font-serif italic">The SACA Vision</h1>
        <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-medium">Quantifying cognitive architecture through the lens of student-led innovation.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
        <div className="relative group">
          <div className="aspect-square bg-slate-950 rounded-[70px] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] relative z-10 border-[12px] border-white">
             <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 p-16">
               <div className="w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center text-7xl font-serif text-white mb-8 shadow-2xl shadow-blue-500/20 group-hover:scale-105 transition-transform duration-700">
                 AK
               </div>
               <div className="text-center">
                 <h3 className="text-3xl font-bold text-white tracking-tight">Amogh Kadadi</h3>
                 <p className="text-slate-400 text-xs font-mono mt-4 uppercase tracking-[0.4em]">15-Year-Old Founder</p>
               </div>
             </div>
          </div>
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        </div>
        
        <div className="space-y-12">
          <div className="inline-block px-4 py-2 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em]">Developer Context</div>
          <h2 className="text-6xl font-bold text-slate-950 tracking-tighter leading-tight">Student-Led Rigor</h2>
          <p className="text-blue-600 font-serif italic text-3xl leading-snug">
            "We aren't just measuring intelligence; we're architecting a roadmap for its expansion."
          </p>
          <div className="space-y-8 text-xl text-slate-500 font-medium leading-relaxed">
            <p>
              SACA was conceived by Amogh Kadadi, a 15-year-old student from India with a deep passion for cognitive systems. Dissatisfied with standard educational assessments, Amogh sought to build a platform that maps the mind's recursive patterns with institutional precision.
            </p>
            <p>
              His work is a synthesis of academic psychometrics and modern AI architecture, designed to provide a calm, trust-based environment for both students and adults to benchmark their potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
