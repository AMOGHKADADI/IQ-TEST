
import React from 'react';

const Methodology: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-16">
        <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-4 block">Psychometric Framework</span>
        <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight italic font-serif">The SACA Protocol</h1>
        <p className="text-slate-500 text-lg">Understanding the science behind the Standardized AI Cognitive Assessment.</p>
      </div>

      <div className="space-y-20">
        <section className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-blue-600 rounded-xl text-white flex items-center justify-center mr-4 text-sm">01</span>
            Adaptive Difficulty Core
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            Unlike static paper tests, SACA utilizes an <span className="font-bold text-slate-900">Item Response Theory (IRT)</span> derived model. The difficulty of each subsequent question is adjusted in real-time based on your latent trait estimation (theta).
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Linear Adjustment</h4>
              <p className="text-xs text-slate-500">Balances accuracy against question difficulty to find the exact point of cognitive saturation.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2">Response Latency</h4>
              <p className="text-xs text-slate-500">Measurement of the milliseconds between stimulus and resolution, weighting 'intuitive' versus 'calculated' responses.</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-10 h-10 bg-white rounded-xl text-slate-900 flex items-center justify-center mr-4 text-sm">02</span>
            AI Behavioral Analysis
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-8">
            We leverage Google's Gemini-3 models to interpret not just your final score, but the *pattern* of your cognition. This results in the "Unique Behavioral Tagline" which reflects your specific neural dominance.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-400 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Detection of fatigue patterns through increasing response variance.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-400 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Identification of domain-specific processing speeds (e.g., verbal vs. logic).</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-400 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Contextual score normalization against Age Group benchmarks.</span>
            </li>
          </ul>
        </section>

        <section className="text-center py-12">
          <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-widest uppercase">Ethics & Privacy</h3>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            All data processed by the AI Cognitive Research Institute is anonymized. We do not store biometric data or individual identifiers outside of encrypted certificate records. SACA is designed for profiling and development, not clinical diagnosis.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Methodology;
