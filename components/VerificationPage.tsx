
import React, { useState, useEffect } from 'react';
import { TestResult } from '../types';
import { Language, translations } from '../translations';

interface VerificationPageProps {
  userHistory: TestResult[];
  userName: string;
  lang: Language;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ userHistory, userName, lang }) => {
  const [searchId, setSearchId] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<{result: TestResult, name: string} | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const t = translations[lang];

  // Auto-verify if ID is in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verifyId = params.get('verify');
    if (verifyId) {
      setSearchId(verifyId.toUpperCase());
      handleVerify(verifyId.toUpperCase());
    }
  }, [userHistory]);

  const handleVerify = (id?: string) => {
    const query = (id || searchId).trim().toUpperCase();
    if (!query) return;
    setIsScanning(true);
    setHasSearched(false);
    
    // Simulate high-security institutional lookup
    setTimeout(() => {
      const found = userHistory.find(r => r.certificateId.toUpperCase() === query);
      setVerifiedResult(found ? { result: found, name: userName } : null);
      setHasSearched(true);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-24 animate-institutional">
      <div className="text-center mb-24 space-y-6">
        <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.5em] px-6 py-2 bg-blue-50 rounded-full inline-block border border-blue-100">Immutable Ledger V5.2</span>
        <h1 className="text-8xl font-bold text-slate-950 tracking-tighter font-serif italic leading-none">{t.verifyHeader}</h1>
        <p className="text-2xl text-slate-500 max-w-2xl mx-auto font-medium">{t.verifySub}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        <div className="bg-white p-14 rounded-[60px] border border-slate-100 shadow-xl">
          <h3 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-[0.2em] flex items-center">
             <span className="w-2 h-6 bg-slate-950 rounded-full mr-4"></span>
             Record Lookup
          </h3>
          <div className="space-y-8">
             <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Archive ID</label>
               <input
                 type="text"
                 placeholder="SACA-XXXXXX"
                 value={searchId}
                 onChange={(e) => setSearchId(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                 className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-blue-600/5 font-mono text-sm tracking-[0.3em] uppercase"
               />
             </div>
             <button 
               onClick={() => handleVerify()} 
               disabled={isScanning}
               className="w-full bg-slate-950 text-white py-7 rounded-[28px] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-600 transition-all disabled:opacity-50"
             >
               {isScanning ? 'Querying SACA Ledger...' : 'Authenticate Record'}
             </button>
          </div>
        </div>

        <div className="min-h-[500px]">
          {isScanning ? (
            <div className="h-full bg-white p-16 rounded-[60px] border border-slate-100 flex flex-col items-center justify-center text-center space-y-8 animate-pulse">
               <div className="w-24 h-24 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
               <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">Synchronizing Security Nodes...</p>
            </div>
          ) : hasSearched ? (
            verifiedResult ? (
              <div className="bg-white p-14 rounded-[60px] border-2 border-green-500/10 shadow-2xl animate-institutional">
                 <div className="flex items-center gap-6 mb-12">
                    <div className="w-20 h-20 bg-green-50 rounded-[28px] flex items-center justify-center border border-green-100 shadow-sm">
                       <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                       <h3 className="text-3xl font-black tracking-tighter text-slate-950 leading-none mb-2">Authenticated</h3>
                       <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em]">Official Institutional Record</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-y-12 border-t border-slate-50 pt-12">
                    {[
                      { l: 'Subject', v: verifiedResult.name },
                      { l: 'Date', v: new Date(verifiedResult.result.timestamp).toLocaleDateString() },
                      { l: 'Index', v: `${verifiedResult.result.iqScore} SACA PTS` },
                      { l: 'Archive ID', v: verifiedResult.result.certificateId }
                    ].map((item, i) => (
                      <div key={i}>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.l}</p>
                        <p className="text-xl font-bold text-slate-950 tracking-tight uppercase">{item.v}</p>
                      </div>
                    ))}
                 </div>
              </div>
            ) : (
              <div className="bg-red-50 p-16 rounded-[60px] border border-red-100 text-center animate-institutional h-full flex flex-col justify-center items-center">
                 <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                   <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                 </div>
                 <h3 className="text-3xl font-bold text-red-950 mb-4 tracking-tight uppercase">Lookup Failure</h3>
                 <p className="text-red-700/60 font-medium max-w-xs leading-relaxed">The Archive ID provided does not match any current institutional SACA ledger entries.</p>
              </div>
            )
          ) : (
            <div className="h-full bg-slate-50/30 border-2 border-dashed border-slate-200 rounded-[60px] flex flex-col items-center justify-center p-16 text-center text-slate-400">
               <svg className="w-20 h-20 mb-8 opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 21h7a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-5.414-5.414A2 2 0 0011.586 2H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" /></svg>
               <p className="text-xs font-black tracking-[0.4em] uppercase">Enter an ID to query the ledger</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
