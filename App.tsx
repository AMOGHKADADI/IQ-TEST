
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TestEngine from './components/TestEngine';
import Certificate from './components/Certificate';
import VerificationPage from './components/VerificationPage';
import Onboarding from './components/Onboarding';
import About from './components/About';
import AboutFounder from './components/AboutFounder';
import Methodology from './components/Methodology';
import DailyTraining from './components/DailyTraining';
import ContactModal from './components/ContactModal';
import NeuralVisualization from './components/NeuralVisualization';
import Aira from './components/NeuralCounselor';
import { generateCognitiveAnalysis, generatePersonalizedDrills } from './geminiService';
import { TestResponse, TestResult, UserProfile, AgeGroup, TestMode, CognitiveDomain, Drill } from './types';
import { QUESTIONS } from './constants';
import { Language, translations } from './translations';

const LOADING_STEPS = [
  "Synchronizing with SACA-5 Neural Core...",
  "Calibrating latency thresholds...",
  "Synthesizing behavioral architecture...",
  "Generating Personalized Neural Roadmap...",
  "Encoding immutable certificate records..."
];

export const getScoreLabel = (score: number) => {
  if (score >= 90) return { label: 'Exceptional', color: 'text-blue-600', bg: 'bg-blue-50' };
  if (score >= 75) return { label: 'High-Proficiency', color: 'text-indigo-600', bg: 'bg-indigo-50' };
  if (score >= 55) return { label: 'Standard', color: 'text-slate-600', bg: 'bg-slate-50' };
  return { label: 'Developing', color: 'text-amber-600', bg: 'bg-amber-50' };
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('saca_lang');
    return (saved as Language) || 'en';
  });
  const [loadingStep, setLoadingStep] = useState(0);
  const [showContact, setShowContact] = useState(false);
  
  const t = translations[lang];

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('saca_user_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      ageGroup: AgeGroup.ADULT,
      testMode: TestMode.SERIOUS,
      isPremium: true,
      history: [],
      completedDrillsToday: [],
      streak: 0
    };
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);

  useEffect(() => {
    localStorage.setItem('saca_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('saca_lang', lang);
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    if (page === 'contact') {
      setShowContact(true);
    } else {
      setCurrentPage(page);
    }
  };

  const startTest = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
    setCurrentPage('test');
  };

  const calculateResults = async (responses: TestResponse[]) => {
    setIsAnalyzing(true);
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
        generateCognitiveAnalysis(responses, user, lang),
        generatePersonalizedDrills(domainScores, user, lang)
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

      setCurrentResult(result);
      setUser(prev => ({ ...prev, history: [...prev.history, result] }));
      
      clearInterval(interval);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentPage('results');
      }, 800);

    } catch (err) {
      console.error("Analysis error:", err);
      clearInterval(interval);
      setIsAnalyzing(false);
      setCurrentPage('home');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="max-w-7xl mx-auto px-6 py-40 text-center animate-institutional">
            <div className="inline-flex items-center px-6 py-2 bg-slate-100 text-slate-950 rounded-full mb-16 border border-slate-200 shadow-sm">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-4 animate-pulse"></div>
              <span className="font-black tracking-[0.4em] text-[9px] uppercase leading-none">{t.status}</span>
            </div>
            <h1 className="text-8xl md:text-[110px] font-bold text-slate-950 mb-16 tracking-tighter leading-[0.85] font-serif italic">
               Quantify your Neural Architecture.
            </h1>
            <p className="text-2xl md:text-3xl text-slate-400 max-w-4xl mx-auto mb-24 leading-relaxed font-medium">
              A high-precision cognitive assessment platform built for research and self-discovery. Phased conditioning for the Indian demographic.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <button 
                onClick={() => handleNavigate('onboarding')}
                className="bg-slate-950 text-white px-16 py-7 rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-xl active:scale-95"
              >
                {t.initiateBtn}
              </button>
              <button 
                onClick={() => handleNavigate('verification')}
                className="bg-white text-slate-950 border border-slate-200 px-16 py-7 rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
              >
                {t.verifyBtn}
              </button>
            </div>
          </div>
        );

      case 'onboarding': return <Onboarding onStart={startTest} lang={lang} />;
      case 'test': return <TestEngine onComplete={calculateResults} user={user} lang={lang} />;
      case 'verification': return <VerificationPage userHistory={user.history} userName={user.name} lang={lang} />;
      case 'results':
        return currentResult && (
          <div className="max-w-7xl mx-auto px-6 py-24 animate-institutional">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-40">
              <div className="lg:col-span-1 bg-slate-950 text-white p-16 rounded-[60px] shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                <span className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase mb-16">{t.compositeIndex}</span>
                <div className="text-[160px] font-serif leading-none mb-8 italic">{currentResult.iqScore}</div>
                <div className="px-8 py-3 bg-white/5 rounded-full text-[10px] font-black text-slate-300 uppercase tracking-widest border border-white/10 mb-16">
                  {t.reliabilityBand}: {currentResult.confidenceBand[0]} - {currentResult.confidenceBand[1]}
                </div>
                <button 
                  onClick={() => handleNavigate('training')}
                  className="w-full bg-blue-600 py-6 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-xl"
                >
                  View Neural Roadmap
                </button>
              </div>

              <div className="lg:col-span-2 bg-white p-16 rounded-[60px] shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-4xl font-bold text-slate-950 tracking-tighter uppercase mb-20">{t.resultsTitle}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {Object.entries(currentResult.domainScores).map(([domain, score], idx) => {
                      const status = getScoreLabel(score);
                      return (
                        <div key={domain} className="space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{domain}</span>
                            <span className={`text-[10px] font-black uppercase ${status.color}`}>{score}%</span>
                          </div>
                          <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                            <div className={`h-full bg-slate-950 rounded-full transition-all duration-1000 delay-${idx * 100}`} style={{ width: `${score}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-20 p-12 bg-slate-50 rounded-[45px] border border-slate-100 shadow-inner">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">{t.taglineLabel}</h4>
                  <p className="text-4xl font-serif italic text-slate-900 tracking-tight leading-tight">"{currentResult.uniqueTagline}"</p>
                </div>
              </div>
            </div>
            
            <Certificate result={currentResult} user={user} lang={lang} />
            
            <div className="mt-40 grid lg:grid-cols-2 gap-16 items-start">
               <NeuralVisualization prompt={currentResult.uniqueTagline} />
               <div className="bg-white p-16 rounded-[60px] border border-slate-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full -mr-20 -mt-20"></div>
                  <span className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase mb-8 block">Phase II Navigation</span>
                  <h2 className="text-5xl font-bold text-slate-950 tracking-tighter font-serif italic mb-8">Ready for Conditioning?</h2>
                  <p className="text-xl text-slate-500 mb-12 leading-relaxed">Your results have been synthesized into a 30-day neural growth protocol. Unlock your daily brain drills now.</p>
                  <button 
                    onClick={() => handleNavigate('training')}
                    className="group bg-slate-950 text-white px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-[11px] flex items-center gap-6 hover:bg-blue-600 transition-all shadow-xl"
                  >
                    Enter Roadmap
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </button>
               </div>
            </div>
          </div>
        );

      case 'analyzing':
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 max-w-xl mx-auto animate-institutional">
            <div className="w-20 h-20 bg-slate-950 rounded-[25px] flex items-center justify-center relative mb-16 animate-pulse shadow-xl">
              <div className="w-8 h-8 border-[3px] border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-4xl font-bold text-slate-950 mb-16 tracking-tight uppercase">Protocol Synthesis</h2>
            <div className="w-full space-y-8">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-blue-600 transition-all duration-700 ease-out" style={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }} />
              </div>
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em]">{LOADING_STEPS[loadingStep]}</p>
            </div>
          </div>
        );

      default:
        const PageComponent = {
          'about': About,
          'founder': AboutFounder,
          'methodology': Methodology,
          'training': DailyTraining,
        }[currentPage];
        return PageComponent ? <PageComponent user={user} onUpdateUser={(upd) => setUser(p => ({...p, ...upd}))} onNavigate={handleNavigate} lang={lang} /> : null;
    }
  };

  const latestResult = user.history.length > 0 ? user.history[user.history.length - 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFC]">
      <Header onNavigate={handleNavigate} currentPage={currentPage} lang={lang} setLang={setLang} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Aira user={user} latestResult={latestResult} lang={lang} />
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      <footer className="bg-white border-t border-slate-100 pt-32 pb-16 no-print">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-32">
            <div className="space-y-12">
              <div className="flex items-center cursor-pointer group" onClick={() => handleNavigate('home')}>
                <div className="w-12 h-12 bg-slate-950 rounded-[14px] flex items-center justify-center mr-4 transition-all hover:bg-blue-600">
                  <span className="text-white font-bold text-2xl">S</span>
                </div>
                <span className="text-2xl font-black text-slate-950 tracking-tighter uppercase">SACA</span>
              </div>
              <p className="text-base text-slate-400 font-medium leading-relaxed max-w-xs">{t.footerQuote}</p>
            </div>
            <div className="space-y-12">
              <p className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em]">System Core</p>
              <ul className="text-[11px] text-slate-400 space-y-6 font-bold uppercase tracking-[0.2em]">
                <li className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleNavigate('methodology')}>{t.protocol}</li>
                <li className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleNavigate('verification')}>{t.verifyBtn}</li>
              </ul>
            </div>
            <div className="space-y-12">
              <p className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em]">Governance</p>
              <ul className="text-[11px] text-slate-400 space-y-6 font-bold uppercase tracking-[0.2em]">
                <li className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleNavigate('founder')}>{t.founder}</li>
                <li className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleNavigate('training')}>{t.training}</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <span>© 2024 SACA INSTITUTIONAL COGNITIVE ARCHIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
