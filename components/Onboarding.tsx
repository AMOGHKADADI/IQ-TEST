
import React, { useState, useEffect } from 'react';
import { AgeGroup, TestMode, UserProfile } from '../types';
import { translations, Language } from '../translations';

interface OnboardingProps {
  onStart: (data: Partial<UserProfile>) => void;
  lang: Language;
  prefill?: UserProfile | null;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart, lang, prefill }) => {
  const [name, setName] = useState(prefill?.name || '');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(prefill?.ageGroup || AgeGroup.ADULT);
  const [testMode, setTestMode] = useState<TestMode>(prefill?.testMode || TestMode.SERIOUS);
  // @ts-ignore
  const t = translations[lang];

  useEffect(() => {
    if (prefill) {
      setName(prefill.name);
      setAgeGroup(prefill.ageGroup);
      setTestMode(prefill.testMode);
    }
  }, [prefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onStart({ name, ageGroup, testMode });
  };

  return (
    <div className="max-w-xl mx-auto py-24 px-6 animate-institutional">
      <div className="bg-white rounded-[60px] shadow-2xl border border-slate-100 p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16"></div>
        
        <div className="text-center mb-16 relative z-10">
          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif italic tracking-tighter leading-tight">Protocol Admission</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Environmental Calibration Phase</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Identity Signature</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amogh Kadadi"
              className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[28px] focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Cognitive Cohort</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[28px] focus:outline-none focus:ring-4 focus:ring-blue-600/5 appearance-none font-bold text-slate-800 cursor-pointer"
              >
                {Object.values(AgeGroup).map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Assessment Depth</label>
              <select
                value={testMode}
                onChange={(e) => setTestMode(e.target.value as TestMode)}
                className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[28px] focus:outline-none focus:ring-4 focus:ring-blue-600/5 appearance-none font-bold text-slate-800 cursor-pointer"
              >
                {Object.values(TestMode).map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-slate-950 text-white py-8 rounded-[35px] font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-2xl active:scale-[0.98]"
            >
              Initiate Standardized Test
            </button>
            <p className="text-center text-[9px] text-slate-300 mt-12 uppercase tracking-[0.3em] leading-relaxed font-black px-4">
              AES-256 REGISTRY PROTECTION • VERIFIABLE CERTIFICATION • INDIA GATEWAY
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
