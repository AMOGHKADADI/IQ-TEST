
import React, { useState } from 'react';
import { AgeGroup, TestMode, UserProfile } from '../types';
import { translations, Language } from '../translations';

interface OnboardingProps {
  onStart: (data: Partial<UserProfile>) => void;
  lang: Language;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart, lang }) => {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(AgeGroup.ADULT);
  const [testMode, setTestMode] = useState<TestMode>(TestMode.SERIOUS);
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onStart({ name, ageGroup, testMode });
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 font-serif italic">{t.onboardingTitle}</h2>
          <p className="text-slate-500 font-medium">{t.onboardingSub}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">{t.nameLabel}</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amogh Kadadi"
              className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[22px] focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">{t.ageLabel}</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[22px] focus:outline-none focus:ring-4 focus:ring-blue-600/5 appearance-none font-bold text-slate-800 cursor-pointer"
              >
                {Object.values(AgeGroup).map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">{t.modeLabel}</label>
              <select
                value={testMode}
                onChange={(e) => setTestMode(e.target.value as TestMode)}
                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[22px] focus:outline-none focus:ring-4 focus:ring-blue-600/5 appearance-none font-bold text-slate-800 cursor-pointer"
              >
                {Object.values(TestMode).map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-slate-950 text-white py-6 rounded-[28px] font-black text-lg hover:bg-blue-600 transition-all shadow-2xl active:scale-[0.98]"
            >
              {t.startBtn}
            </button>
            <p className="text-center text-[9px] text-slate-400 mt-8 uppercase tracking-[0.2em] leading-relaxed font-black px-4">
              SECURE PROTOCOL ENABLED &bull; VERIFIABLE CERTIFICATION &bull; INDIA
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
