
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TestEngine from './components/TestEngine';
import Certificate from './components/Certificate';
import VerificationPage from './components/VerificationPage';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import About from './components/About';
import AboutFounder from './components/AboutFounder';
import Methodology from './components/Methodology';
import DailyTraining from './components/DailyTraining';
import ContactModal from './components/ContactModal';
import Aira from './components/NeuralCounselor';
import { generateCognitiveAnalysis, generatePersonalizedDrills } from './geminiService';
import { TestResponse, TestResult, UserProfile, AgeGroup, TestMode, CognitiveDomain } from './types';
import { QUESTIONS } from './constants';
import { Language, translations } from './translations';

const LOADING_STEPS = [
  "Synchronizing with SACA-5 Neural Core...",
  "Calibrating latency thresholds...",
  "Synthesizing behavioral architecture...",
  "Generating Personalized Neural Roadmap...",
  "Encoding immutable certificate records..."
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('saca_lang');
    return (saved as Language) || 'en';
  });
  const [loadingStep, setLoadingStep] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const t = translations[lang];

  const getRegistry = (): Record<string, UserProfile> => {
    const saved = localStorage.getItem('SACA_REGISTRY');
    return saved ? JSON.parse(saved) : {};
  };

  const updateRegistry = (user: UserProfile) => {
    if (!user || !user.email) return;
    const registry = getRegistry();
    registry[user.email.toLowerCase()] = user;
    localStorage.setItem('SACA_REGISTRY', JSON.stringify(registry));
    setCurrentUser(user);
  };

  useEffect(() => {
    const sessionEmail = localStorage.getItem('SACA_SESSION_EMAIL');
    if (sessionEmail) {
      const registry = getRegistry();
      const user = registry[sessionEmail.toLowerCase()];
      if (user) {
        setCurrentUser(user);
        setCurrentPage('dashboard');
      }
    }
  }, []);

  const handleAuthSuccess = (user: UserProfile) => {
    localStorage.setItem('SACA_SESSION_EMAIL', user.email);
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('SACA_SESSION_EMAIL');
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const startTest = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...data };
    updateRegistry(updatedUser as UserProfile);
    setCurrentPage('test');
  };

  const calculateResults = async (responses: TestResponse[]) => {
    if (!currentUser) return;
    setCurrentPage('analyzing');
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      setLoadingStep(stepIndex);
      stepIndex = (stepIndex + 1) % LOADING_STEPS.length;
    }, 1200);

    try {
      const totalPossibleWeight = responses.reduce((acc, r) => {
        const q = QUESTIONS.find(qObj => qObj.id === r.questionId);
        return acc + (q?.difficulty || 1);
      }, 0);
      
      const userWeight = responses.reduce((acc, r) => {
        if (!r.isCorrect) return acc;
        const q = QUESTIONS.find(qObj => qObj.id === r.questionId);
        return acc + (q?.difficulty || 1);
      }, 0);

      const accuracyRate = userWeight / (totalPossibleWeight || 1);
      const avgTime = responses.reduce((acc, r) => acc + r.timeTaken, 0) / (responses.length || 1);
      let iq = 85 + (accuracyRate * 60);
      const speedBonus = (25000 - avgTime) / 15000 * 8;
      iq += Math.max(-8, Math.min(8, speedBonus));

      const finalIQ = Math.max(70, Math.min(160, Math.round(iq)));

      const domainScores: Record<CognitiveDomain, number> = {} as any;
      Object.values(CognitiveDomain).forEach(domain => {
        const dQuestions = responses.filter(r => {
          const q = QUESTIONS.find(qObj => qObj.id === r.questionId);
          return q?.domain === domain;
        });
        if (dQuestions.length === 0) {
          domainScores[domain] = Math.floor(60 + Math.random() * 20);
        } else {
          const score = (dQuestions.filter(r => r.isCorrect).length / dQuestions.length) * 100;
          domainScores[domain] = Math.round(score);
        }
      });

      const [analysis, drills] = await Promise.all([
        generateCognitiveAnalysis(responses, currentUser, lang),
        generatePersonalizedDrills(domainScores, currentUser, lang)
      ]);

      const result: TestResult = {
        iqScore: finalIQ,
        confidenceBand: [finalIQ - 4, finalIQ + 4],
        domainScores,
        totalTime: responses.reduce((acc, r) => acc + r.timeTaken, 0),
        timestamp: new Date().toISOString(),
        certificateId: `SACA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        uniqueTagline: analysis.tagline,
        personalizedDrills: drills
      };

      const updatedUser = { 
        ...currentUser, 
        history: [...currentUser.history, result] 
      };
      updateRegistry(updatedUser);
      
      clearInterval(interval);
      setTimeout(() => {
        setCurrentPage('results');
      }, 800);

    } catch (err) {
      console.error("Analysis error:", err);
      clearInterval(interval);
      setCurrentPage('dashboard');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 lg:py-48 text-center animate-institutional">
            <div className="inline-flex items-center px-5 py-2 bg-slate-100/80 backdrop-blur text-slate-950 rounded-full mb-10 border border-slate-200/50 shadow-sm">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <span className="font-black tracking-[0.4em] text-[8px] md:text-[9px] uppercase leading-none">{t.status}</span>
            </div>
            
            <h1 className="font-serif italic font-bold text-slate-950 tracking-tighter leading-[1.1] md:leading-[1.0] max-w-5xl mx-auto mb-12" style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}>
               The Standard of Human Intelligence.
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
              Join the institutional registry of cognitive performance. Securely benchmark your neural architecture and track historical growth.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button 
                onClick={() => setCurrentPage(currentUser ? 'dashboard' : 'login')}
                className="w-full sm:w-auto bg-slate-950 text-white px-12 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-xl active:scale-95"
              >
                {currentUser ? 'Access Portal' : 'Login / Register'}
              </button>
              <button 
                onClick={() => setCurrentPage('verification')}
                className="w-full sm:w-auto bg-white text-slate-950 border border-slate-200 px-12 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
              >
                {t.verifyBtn}
              </button>
            </div>
          </div>
        );

      case 'login': return <Auth onSuccess={handleAuthSuccess} lang={lang} />;
      case 'dashboard': return currentUser && <Dashboard user={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} lang={lang} />;
      case 'onboarding': return <Onboarding onStart={startTest} lang={lang} prefill={currentUser} />;
      case 'test': return currentUser && <TestEngine onComplete={calculateResults} user={currentUser} lang={lang} />;
      case 'results':
        const latestResult = currentUser?.history[currentUser.history.length - 1];
        return currentUser && latestResult && (
          <div className="max-w-7xl mx-auto px-6 py-10 md:py-24 animate-institutional">
            <div className="flex justify-between items-center mb-10">
               <button onClick={() => setCurrentPage('dashboard')} className="flex items-center gap-3 text-slate-400 hover:text-slate-950 transition-all font-black uppercase tracking-widest text-[9px]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                  Dashboard
               </button>
               <span className="text-[9px] hidden sm:inline-block font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-5 py-2 rounded-full border border-blue-100">Record successfully encoded</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-20 md:mb-40">
              <div className="lg:col-span-1 bg-slate-950 text-white p-10 md:p-16 rounded-[48px] md:rounded-[60px] shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                <span className="text-[9px] font-black tracking-[0.5em] text-blue-500 uppercase mb-10">{t.compositeIndex}</span>
                <div className="text-[100px] md:text-[160px] font-serif leading-none mb-6 italic">{latestResult.iqScore}</div>
                <div className="px-6 py-2.5 bg-white/5 rounded-full text-[9px] font-black text-slate-300 uppercase tracking-widest border border-white/10 mb-10">
                  {t.reliabilityBand}: {latestResult.confidenceBand[0]} - {latestResult.confidenceBand[1]}
                </div>
                <button 
                  onClick={() => setCurrentPage('training')}
                  className="w-full bg-blue-600 py-5 rounded-3xl font-black text-[9px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-xl"
                >
                  Enter Growth Path
                </button>
              </div>

              <div className="lg:col-span-2 bg-white p-10 md:p-16 rounded-[48px] md:rounded-[60px] shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-slate-950 tracking-tighter uppercase mb-10 md:mb-20">{t.resultsTitle}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-12">
                    {Object.entries(latestResult.domainScores).map(([domain, score], idx) => (
                      <div key={domain} className="space-y-2 md:space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{domain}</span>
                          <span className="text-[9px] font-black uppercase text-slate-950">{score}%</span>
                        </div>
                        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                          <div className={`h-full bg-slate-950 rounded-full transition-all duration-1000 delay-${idx * 100}`} style={{ width: `${score}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 md:mt-20 p-8 md:p-12 bg-slate-50 rounded-[40px] md:rounded-[45px] border border-slate-100 shadow-inner">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">{t.taglineLabel}</h4>
                  <p className="text-xl md:text-4xl font-serif italic text-slate-900 tracking-tight leading-tight">"{latestResult.uniqueTagline}"</p>
                </div>
              </div>
            </div>
            
            <Certificate result={latestResult} user={currentUser} lang={lang} />
            
            <div className="mt-20 md:mt-40 flex justify-center">
               <div className="bg-white p-10 md:p-16 rounded-[48px] md:rounded-[60px] border border-slate-100 shadow-sm relative overflow-hidden group max-w-4xl w-full text-center">
                  <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-blue-50/50 rounded-full -mr-16 md:-mr-20 -mt-16 md:-mt-20"></div>
                  <span className="text-[9px] font-black text-blue-600 tracking-[0.4em] uppercase mb-8 block">Next Step Navigation</span>
                  <h2 className="text-3xl md:text-6xl font-bold text-slate-950 tracking-tighter font-serif italic mb-6 md:mb-10">Ready for Conditioning?</h2>
                  <p className="text-xl md:text-2xl text-slate-500 mb-10 md:mb-14 leading-relaxed max-w-2xl mx-auto">Your unique cognitive metrics have been synthesized into a specialized growth protocol. Access your dashboard to begin.</p>
                  <button 
                    onClick={() => setCurrentPage('training')}
                    className="mx-auto group bg-slate-950 text-white px-12 py-6 md:px-16 md:py-8 rounded-full font-black uppercase tracking-widest text-[11px] md:text-[13px] flex items-center gap-6 hover:bg-blue-600 transition-all shadow-3xl active:scale-95"
                  >
                    ENTER NEURAL ROADMAP
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </button>
               </div>
            </div>
          </div>
        );

      case 'analyzing':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 max-w-xl mx-auto animate-institutional">
            <div className="w-16 h-16 bg-slate-950 rounded-[20px] flex items-center justify-center relative mb-10 animate-pulse shadow-xl">
              <div className="w-6 h-6 border-[2px] border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-10 tracking-tight uppercase">Protocol Synthesis</h2>
            <div className="w-full space-y-6">
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-blue-600 transition-all duration-700 ease-out" style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }} />
              </div>
              <p className="text-slate-400 font-black text-[8px] md:text-[9px] uppercase tracking-[0.5em]">{LOADING_STEPS[loadingStep]}</p>
            </div>
          </div>
        );

      default:
        const PageComponent = {
          'about': About,
          'founder': AboutFounder,
          'methodology': Methodology,
          'training': DailyTraining,
          'verification': VerificationPage,
        }[currentPage];
        return PageComponent ? (
          // @ts-ignore
          <PageComponent 
            user={currentUser} 
            onUpdateUser={updateRegistry} 
            onNavigate={setCurrentPage} 
            lang={lang} 
            userHistory={getRegistry()[currentUser?.email?.toLowerCase() || '']?.history || []}
            userName={currentUser?.name || ''}
          />
        ) : null;
    }
  };

  const latestResultForAira = currentUser?.history[currentUser.history.length - 1] || null;

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        lang={lang} 
        setLang={setLang} 
        user={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow pb-16 md:pb-0">
        {renderContent()}
      </main>
      <Aira 
        user={currentUser || { name: 'Guest', email: '', ageGroup: AgeGroup.ADULT, testMode: TestMode.SERIOUS, isPremium: false, history: [], id: '' }} 
        latestResult={latestResultForAira} 
        lang={lang} 
        activePage={currentPage}
      />
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      <footer className="bg-white border-t border-slate-100 pt-16 md:pt-24 pb-12 no-print">
        <div className="max-w-7xl mx-auto px-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-24">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center cursor-pointer group" onClick={() => setCurrentPage('home')}>
                <div className="w-10 h-10 bg-slate-950 rounded-[12px] flex items-center justify-center mr-3 transition-all group-hover:bg-blue-600">
                  <span className="text-white font-bold text-xl leading-none">S</span>
                </div>
                <span className="text-xl font-black text-slate-950 tracking-tighter uppercase leading-none">SACA</span>
              </div>
              <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-xs">{t.footerQuote}</p>
            </div>
            <div className="space-y-6 md:space-y-8">
              <p className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em]">System Core</p>
              <ul className="text-[10px] text-slate-400 space-y-3 md:space-y-4 font-bold uppercase tracking-[0.2em]">
                <li className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setCurrentPage('methodology')}>{t.protocol}</li>
                <li className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setCurrentPage('verification')}>{t.verifyBtn}</li>
              </ul>
            </div>
            <div className="space-y-6 md:space-y-8">
              <p className="text-[10px] font-black text-slate-950 uppercase tracking-[0.5em]">Governance</p>
              <ul className="text-[10px] text-slate-400 space-y-3 md:space-y-4 font-bold uppercase tracking-[0.2em]">
                <li className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setCurrentPage('founder')}>{t.founder}</li>
                <li className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setCurrentPage('training')}>{t.training}</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">
            <span>© 2024 SACA INSTITUTIONAL COGNITIVE ARCHIVE</span>
            <div className="flex gap-6">
              <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-400 cursor-pointer">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
