
import React, { useState } from 'react';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate institutional secure transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden animate-in slide-in-from-bottom-12 duration-500 border border-white">
        {submitted ? (
          <div className="p-20 text-center space-y-10 animate-institutional">
            <div className="w-24 h-24 bg-blue-50 rounded-[35px] flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-slate-950 tracking-tighter font-serif italic">Communication Logged.</h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm mx-auto">An institutional analyst will review your inquiry parameters and respond via verified channels within 24 hours.</p>
            </div>
            <button 
              onClick={onClose} 
              className="bg-slate-950 text-white px-16 py-6 rounded-[28px] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-600 transition-all active:scale-95"
            >
              Close Secure Portal
            </button>
          </div>
        ) : (
          <>
            <div className="p-12 pb-0 flex justify-between items-start relative z-10">
              <div className="space-y-2">
                <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] block">Institutional Gateway</span>
                <h3 className="text-4xl font-bold tracking-tighter text-slate-950 font-serif italic leading-none">Direct Inquiry</h3>
              </div>
              <button 
                onClick={onClose} 
                className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all text-slate-400 hover:text-slate-900 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-12 pt-10 space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Subject Name" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-[22px] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:bg-white focus:border-blue-200 transition-all font-bold text-slate-800" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verified Contact</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-[22px] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:bg-white focus:border-blue-200 transition-all font-bold text-slate-800" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category of Inquiry</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-[22px] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:bg-white focus:border-blue-200 transition-all font-bold text-slate-800 cursor-pointer appearance-none">
                    <option>Institutional API Audit</option>
                    <option>Cognitive Data Correction</option>
                    <option>Archival Verification Request</option>
                    <option>Press & Legal Inquiry</option>
                    <option>Founder Collaboration</option>
                  </select>
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Payload</label>
                <textarea 
                  required 
                  rows={4} 
                  placeholder="Describe the inquiry parameters in detail..." 
                  className="w-full bg-slate-50 border border-slate-100 rounded-[22px] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:bg-white focus:border-blue-200 transition-all font-bold text-slate-800 resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group w-full bg-slate-950 text-white py-7 rounded-[30px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Transmitting...
                  </>
                ) : (
                  <>
                    Transmit Secure Request
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
            <div className="px-12 pb-8 text-center">
              <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.3em]">Institutional Communication Standard V2.1 • AES-256 Encrypted</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
