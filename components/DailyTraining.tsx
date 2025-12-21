
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

  const personalizedDrills = latestResult?.personalizedDrills || [];

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
        <h2 className="text-4xl font-bold text-slate-950 mb-6 font-serif italic tracking-tight">Identity Not Established</h2>
        <p className="text-slate-500 mb-12 max-w-sm mx-auto font-medium">Please complete the standardized assessment to unlock your personalized neural roadmap.</p>
        <button onClick={() => onNavigate('onboarding')} className="bg-slate-950 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-blue-600 transition-all">Initiate Protocol</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 animate-institutional">
      <div className="mb-24 space-y-4">
         <span className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase">Phase II: Neuroplastic Growth</span>
         <h1 className="text-7xl font-bold text-slate-950 tracking-tighter font-serif italic leading-none">Interactive Neural Roadmap</h1>
         <p className="text-xl text-slate-400 max-w-2xl font-medium">A research-backed 30-day conditioning path based on your unique cognitive markers.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8 mb-24">
        {['Focus', 'Memory', 'Logic', 'Speed'].map((domain, i) => (
          <div key={domain} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors"></div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Neural Node 0{i+1}</p>
            <h3 className="text-2xl font-bold text-slate-950 mb-2">{domain}</h3>
            <div className="h-1 w-full bg-slate-50 rounded-full mt-6">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${60 + (i * 10)}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-10">
        <h3 className="text-2xl font-bold text-slate-950 flex items-center uppercase tracking-widest">
           <span className="w-1.5 h-6 bg-slate-950 rounded-full mr-4"></span>
           Active Brain Conditioning Protocols
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personalizedDrills.map((drill, idx) => {
            const isDone = user.completedDrillsToday?.includes(drill.id);
            return (
              <div 
                key={idx} 
                onClick={() => !isDone && setActiveDrill(drill)}
                className={`group p-10 rounded-[45px] border transition-all cursor-pointer relative overflow-hidden ${
                  isDone ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl'
                }`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl ${isDone ? 'bg-slate-100 text-slate-400' : 'bg-slate-950 text-white group-hover:bg-blue-600 transition-colors'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{drill.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-medium mb-8 line-clamp-3">{drill.description}</p>
                <div className="flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-widest pt-6 border-t border-slate-50">
                   <span>{drill.duration} Session</span>
                   <span className="text-blue-500">{drill.difficulty} Mastery</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeDrill && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 backdrop-blur-3xl bg-slate-950/60 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[60px] shadow-2xl overflow-hidden animate-institutional border border-slate-100">
             <div className="bg-slate-950 p-12 text-white">
                <span className="text-blue-500 font-black text-[9px] uppercase tracking-[0.5em] mb-3 block">Neural Objective: {activeDrill.domain}</span>
                <h3 className="text-4xl font-bold font-serif italic tracking-tight">{activeDrill.title}</h3>
             </div>
             <div className="p-16 space-y-10">
                {exerciseStep === 0 ? (
                  <>
                    <div className="p-10 bg-slate-50 rounded-[45px] border border-slate-100">
                       <p className="text-2xl text-slate-800 font-medium leading-relaxed italic tracking-tight font-serif">"{activeDrill.description}"</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Instructions</p>
                      <p className="text-slate-600 text-lg leading-relaxed font-medium">{activeDrill.instruction}</p>
                    </div>
                    <button 
                      onClick={() => setExerciseStep(1)}
                      className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl"
                    >
                      Begin Interactive Session
                    </button>
                  </>
                ) : (
                  <div className="text-center py-10 space-y-12 animate-soothing">
                    <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto border-4 border-blue-100 animate-pulse">
                      <span className="text-4xl font-black text-blue-600">60s</span>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-slate-900">Conditioning in Progress</h4>
                      <p className="text-slate-500 max-w-sm mx-auto font-medium">Please follow the mental instructions provided in the protocol. Focus on deep pattern synthesis.</p>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={() => setExerciseStep(0)} className="flex-grow bg-slate-50 py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400">Back</button>
                      <button onClick={() => handleCompleteDrill(activeDrill.id)} className="flex-grow bg-blue-600 text-white py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Mark as Complete</button>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyTraining;
