
import React from 'react';
import { UserProfile } from '../types';
import { Language } from '../translations';

interface DashboardProps {
  user: UserProfile;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  lang: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout, lang }) => {
  const latestResult = user.history.length > 0 ? user.history[user.history.length - 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24 animate-institutional">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24 border-b border-slate-100 pb-12 md:pb-16">
        <div className="space-y-3 md:space-y-4">
           <span className="text-[9px] font-black text-blue-600 tracking-[0.5em] uppercase px-5 py-2 bg-blue-50 rounded-full inline-block border border-blue-100">Member Portal</span>
           <h1 className="text-5xl md:text-7xl font-bold text-slate-950 tracking-tighter font-serif italic leading-none">
             Neural Registry: {user.name}
           </h1>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
           <button 
             onClick={() => onNavigate('onboarding')}
             className="flex-grow md:flex-none bg-slate-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-xl hover:bg-blue-600 transition-all active-scale"
           >
             New Assessment
           </button>
           <button 
             onClick={onLogout}
             className="bg-white border border-slate-200 text-slate-400 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:text-red-600 hover:border-red-100 transition-all active-scale"
           >
             Logout
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16">
        {[
          { label: 'Baseline IQ', value: latestResult ? latestResult.iqScore : '---', sub: 'Last Record' },
          { label: 'Assessments', value: user.history.length, sub: 'Total Records' },
          { label: 'Cognitive Streak', value: `${user.streak || 0}d`, sub: 'Daily Discipline' },
          { label: 'Institutional ID', value: user.id, sub: 'Global Registry' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[45px] border border-slate-100 shadow-sm relative overflow-hidden group hover-scale">
            <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-slate-50 rounded-full -mr-12 md:-mr-16 -mt-12 md:-mt-16 group-hover:bg-blue-50 transition-colors"></div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 md:mb-4 relative z-10">{stat.label}</p>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-950 mb-2 relative z-10 italic leading-none">{stat.value}</h3>
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.25em] relative z-10">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12 md:gap-16">
        <div className="lg:col-span-8 space-y-8 md:space-y-10">
          <h3 className="text-xl md:text-2xl font-bold text-slate-950 flex items-center uppercase tracking-widest">
             <span className="w-1.5 h-6 bg-slate-950 rounded-full mr-4"></span>
             Chronological History
          </h3>
          
          {user.history.length === 0 ? (
            <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[48px] md:rounded-[60px] p-16 md:p-24 text-center">
               <svg className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 md:mb-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3c1.268 0 2.39.234 3.41.659m-4.74 12.892A8 8 0 0018 9.673c0-1.108-.24-2.16-.673-3.105M8 4.105E4 16h5a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
               <h4 className="text-lg md:text-xl font-bold text-slate-400 mb-2 uppercase tracking-widest">No Records Found</h4>
               <p className="text-slate-300 text-xs md:text-sm max-w-xs mx-auto">Initiate your first standardized protocol to begin cognitive tracking.</p>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              {user.history.slice().reverse().map((record, idx) => (
                <div key={idx} className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[45px] border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all hover-scale">
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-950 rounded-2xl md:rounded-3xl flex items-center justify-center text-white font-serif italic text-2xl md:text-3xl shadow-lg group-hover:bg-blue-600 transition-colors">
                      {record.iqScore}
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-slate-950 mb-1 leading-tight">{record.uniqueTagline}</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{new Date(record.timestamp).toLocaleDateString()} • {record.certificateId}</p>
                    </div>
                  </div>
                  <button className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 text-slate-300 hover:text-blue-600 transition-all active-scale">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8 md:space-y-12">
          <div className="bg-slate-950 rounded-[48px] md:rounded-[60px] p-10 md:p-12 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-blue-600/20 rounded-full blur-3xl -mr-16 md:-mr-20 -mt-16 md:-mt-20"></div>
             <div className="relative z-10">
               <span className="text-blue-500 font-black text-[8px] md:text-[9px] uppercase tracking-[0.5em] mb-4 md:mb-6 block">Personalized Roadmap</span>
               <h3 className="text-3xl md:text-4xl font-serif italic mb-6 md:mb-8 leading-tight">Your Neural Topology is evolving.</h3>
               <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 md:mb-10">The SACA Protocol has identified growth domains for your current demographic baseline.</p>
               <button onClick={() => onNavigate('training')} className="w-full bg-white text-slate-950 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-blue-50 transition-all active-scale">Enter Conditioning</button>
             </div>
          </div>
          
          <div className="bg-white p-10 md:p-12 rounded-[48px] md:rounded-[60px] border border-slate-100 shadow-sm text-center">
             <h4 className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6 md:mb-8">Registry Security</h4>
             <div className="flex flex-col items-center gap-4 md:gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-inner">
                   <svg className="w-8 h-8 md:w-10 md:h-10 text-slate-200" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L10 .3l7.834 4.6a1 1 0 01.5 1.175l-2.3 8.2a1 1 0 01-.81.725l-5.124 1a1 1 0 01-.2 0l-5.124-1a1 1 0 01-.81-.725l-2.3-8.2a1 1 0 01.5-1.175zM10 2.308L3.484 6.115l1.921 6.848 4.595.898 4.595-.898 1.921-6.848L10 2.308z" clipRule="evenodd" /></svg>
                </div>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">Verification Link: <br/> <span className="text-blue-500">saca.edu.in/v/{user.id}</span></p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
