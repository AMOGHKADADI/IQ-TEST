
import React, { useState, useMemo } from 'react';
import { UserProfile, CognitiveDomain, Drill, TestResult } from '../types';
import { Language, translations } from '../translations';

interface DailyTrainingProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onNavigate: (page: string) => void;
  lang: Language;
}

const DailyTraining: React.FC<DailyTrainingProps> = ({ user, onUpdateUser, onNavigate, lang }) => {
  const [activeDrill, setActiveDrill] = useState<Drill | null>(null);
  const [exerciseStep, setExerciseStep] = useState(0);
  const t = translations[lang];
  
  const latestResult = useMemo(() => 
    user.history.length > 0 ? user.history[user.history.length - 1] : null
  , [user.history]);

  const personalizedDrills = useMemo(() => latestResult?.personalizedDrills || [], [latestResult]);

  const domainSummary = useMemo(() => {
    if (!latestResult) return [];
    return Object.entries(latestResult.domainScores)
      .sort(([, a], [, b]) => a - b) 
      .slice(0, 4);
  }, [latestResult]);

  const handleCompleteDrill = (drillId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const completedToday = user.completedDrillsToday || [];
    
    if (!completedToday.includes(drillId)) {
      const newCompleted = [...completedToday, drillId];
      let newStreak = user.streak || 0;
      
      if (user.lastActiveDay !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        if (user.lastActiveDay === yesterdayStr) newStreak += 1;
        else newStreak = 1;
      }

      onUpdateUser({
        completedDrillsToday: newCompleted,
        lastActiveDay: today,
        streak: newStreak
      });
    }
    setActiveDrill(null);
    setExerciseStep(0);
  };

  if (!latestResult) {
    return (
      <div className="max-w-4xl mx-auto py-48 px-6 text-center animate-institutional">
        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[30px] flex items-center justify-center mx-auto mb-10">
           <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.268 0 2.39.234 3.41.659m-4.74 12.892A8 8 0 0018 9.673c0-1.108-.24-2.16-.673-3.105M8 4.105E4 16h5a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
        </div>
        <h2 className="text-4xl font-bold text-slate-950 mb-6 font-serif italic tracking-tight">First things first.</h2>
        <p className="text-slate-500 mb-12 max-w-sm mx-auto font-medium">Complete your IQ test to unlock these personalized drills designed specifically for you.</p>
        <button onClick={() => onNavigate('onboarding')} className="bg-slate-950 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-blue-600 transition-all">Take Test</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 animate-institutional">
      <div className="mb-20 space-y-4">
         <span className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase">Daily Growth Drills</span>
         <h1 className="text-7xl font-bold text-slate-950 tracking-tighter font-serif italic leading-none">Your Brain Training</h1>
         <p className="text-xl text-slate-400 max-w-2xl font-medium">Simple, effective activities to sharpen your thinking based on your test results.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {domainSummary.map(([domain, score], i) => (
          <div key={domain} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-slate-950 mb-1 capitalize">{domain.replace('_', ' ').toLowerCase()}</h3>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-4">Focus Score</p>
            <div className="text-3xl font-serif italic font-bold text-blue-600">{score}%</div>
          </div>
        ))}
      </div>

      <div className="space-y-12">
        <h3 className="text-2xl font-bold text-slate-950 flex items-center uppercase tracking-widest">
           <span className="w-1.5 h-6 bg-slate-950 rounded-full mr-4"></span>
           Today's Drills
        </h3>

        {personalizedDrills.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[50px] p-24 text-center">
             <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">Preparing your custom drills...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalizedDrills.map((drill, idx) => {
              const isDone = user.completedDrillsToday?.includes(drill.id);
              return (
                <div 
                  key={idx} 
                  onClick={() => !isDone && setActiveDrill(drill)}
                  className={`group p-10 rounded-[45px] border transition-all cursor-pointer relative ${
                    isDone ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-blue-600 hover:shadow-2xl'
                  }`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDone ? 'bg-slate-200 text-slate-400' : 'bg-slate-950 text-white shadow-lg'}`}>
                       {isDone ? <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> : idx + 1}
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{drill.duration}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{drill.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{drill.description}</p>
                  <div className={`mt-4 pt-6 border-t border-slate-50 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${isDone ? 'text-green-600' : 'text-blue-600'}`}>
                    {isDone ? 'COMPLETED' : 'START DRILL'}
                    {!isDone && <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {activeDrill && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 backdrop-blur-3xl bg-slate-950/60 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl rounded-[60px] shadow-2xl overflow-hidden animate-institutional border border-slate-100">
             <div className="bg-slate-950 p-10 text-white flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-blue-500 font-black text-[9px] uppercase tracking-[0.5em] block">{activeDrill.domain} Practice</span>
                  <h3 className="text-3xl font-bold font-serif italic tracking-tight">{activeDrill.title}</h3>
                </div>
                <button onClick={() => setActiveDrill(null)} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             <div className="p-12 space-y-8">
                {exerciseStep === 0 ? (
                  <>
                    <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 shadow-inner">
                       <p className="text-xl text-slate-800 font-medium leading-relaxed font-serif italic">"{activeDrill.description}"</p>
                    </div>
                    <div className="space-y-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        How to do it:
                      </p>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <p className="text-slate-700 text-lg leading-relaxed font-bold whitespace-pre-wrap">{activeDrill.instruction}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setExerciseStep(1)}
                      className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                    >
                      Start Timer
                    </button>
                  </>
                ) : (
                  <div className="text-center py-6 space-y-10 animate-soothing">
                    <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto border-4 border-blue-100 animate-pulse">
                      <span className="text-4xl font-black text-blue-600 font-mono">60s</span>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Focus on the task...</h4>
                      <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">Take a deep breath and perform the steps listed on the previous screen.</p>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setExerciseStep(0)} className="flex-grow bg-slate-100 py-6 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-200 transition-all">Go Back</button>
                      <button onClick={() => handleCompleteDrill(activeDrill.id)} className="flex-grow bg-blue-600 text-white py-6 rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all active:scale-95">I'm Done!</button>
                    </div>
                  </div>
                )}
             </div>
             <div className="bg-slate-50 py-4 text-center">
               <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">Personalized Brain Training Node</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyTraining;
