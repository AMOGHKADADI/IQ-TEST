
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Question, TestResponse, CognitiveDomain, UserProfile, AgeGroup, TestMode } from '../types';
import { QUESTIONS } from '../constants';
import { translations, Language } from '../translations';

interface TestEngineProps {
  onComplete: (responses: TestResponse[]) => void;
  user: UserProfile;
  lang: Language;
}

const TestEngine: React.FC<TestEngineProps> = ({ onComplete, user, lang }) => {
  const [phase, setPhase] = useState<'calibrating' | 'testing'>('calibrating');
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const protocolId = useMemo(() => `SACA-${Math.floor(100000 + Math.random() * 900000)}`, []);
  const t = translations[lang];

  const selectedQuestions = useMemo(() => {
    let pool = [...QUESTIONS];
    if (user.ageGroup === AgeGroup.CHILD) {
      pool = pool.filter(q => q.difficulty <= 4);
    } else if (user.ageGroup === AgeGroup.TEEN) {
      pool = pool.filter(q => q.difficulty >= 3 && q.difficulty <= 8);
    } else {
      pool = pool.filter(q => q.difficulty >= 6);
    }

    const targetCount = user.testMode === TestMode.FAST ? 5 : 10;
    const selection = pool.sort(() => Math.random() - 0.5).slice(0, targetCount);
    return selection.sort((a, b) => a.difficulty - b.difficulty);
  }, [user.ageGroup, user.testMode]);

  useEffect(() => {
    if (phase === 'calibrating') {
      const interval = setInterval(() => {
        setCalibrationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('testing'), 800);
            return 100;
          }
          const increment = prev > 80 ? 0.5 : 2;
          return prev + increment;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [responses, setResponses] = useState<TestResponse[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = useCallback((selectedIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const question = selectedQuestions[currentIdx];
    const timeTaken = Date.now() - startTime;
    const isCorrect = selectedIndex === question.correctIndex;

    const newResponses = [...responses, {
      questionId: question.id,
      selectedIndex,
      timeTaken,
      isCorrect,
    }];
    
    setTimeout(() => {
      if (currentIdx + 1 < selectedQuestions.length) {
        setResponses(newResponses);
        setCurrentIdx(currentIdx + 1);
        setStartTime(Date.now());
        setTimeLeft(45);
        setIsTransitioning(false);
      } else {
        onComplete(newResponses);
      }
    }, 600);
  }, [currentIdx, responses, startTime, onComplete, selectedQuestions, isTransitioning]);

  useEffect(() => {
    if (phase !== 'testing' || currentIdx >= selectedQuestions.length) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(-1); 
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIdx, selectedQuestions.length, phase, handleAnswer]);

  if (phase === 'calibrating') {
    return (
      <div className="max-w-2xl mx-auto py-48 px-6 text-center animate-soothing">
        <div className="w-24 h-24 bg-slate-950 rounded-[35px] flex items-center justify-center mx-auto mb-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/20 animate-pulse"></div>
          <div className="w-8 h-8 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin relative z-10"></div>
        </div>
        <h2 className="text-4xl font-bold text-slate-950 mb-6 tracking-tight font-serif italic">{t.calibrationTitle}</h2>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.5em] mb-12">{t.calibrationSub}</p>
        <div className="max-w-md mx-auto h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
           <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${calibrationProgress}%` }}></div>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentIdx];

  return (
    <div className="max-w-5xl mx-auto py-24 px-6 animate-soothing">
      <div className="mb-16 flex justify-between items-center border-b border-slate-100 pb-12">
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject Baseline</p>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{user.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Protocol ID</p>
          <p className="text-lg font-mono font-bold text-slate-800 tracking-widest">{protocolId}</p>
        </div>
      </div>

      <div className={`bg-white rounded-[60px] shadow-soothing border border-slate-100 overflow-hidden transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
        <div className="h-1.5 bg-slate-50">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
            style={{ width: `${((currentIdx + 1) / selectedQuestions.length) * 100}%` }}
          />
        </div>

        <div className="p-16 md:p-24">
          <div className="flex justify-between items-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-6 py-2.5 rounded-full border border-blue-100">
              {t.moduleLabel} {currentIdx + 1} &bull; {currentQuestion?.domain}
            </span>
            <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-lg font-mono font-bold border transition-all ${timeLeft < 10 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
              {timeLeft}s
            </div>
          </div>

          <h3 className="text-4xl md:text-5xl font-serif italic text-slate-950 mb-20 leading-tight tracking-tight">
            {currentQuestion?.text[lang]}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentQuestion?.options.map((option, idx) => (
              <button
                key={idx}
                disabled={isTransitioning}
                onClick={() => handleAnswer(idx)}
                className="group flex items-center p-8 border-2 border-slate-50 rounded-[35px] hover:border-blue-600 hover:bg-blue-50/30 transition-all text-left active:scale-[0.98] disabled:opacity-50"
              >
                <span className="w-12 h-12 rounded-xl border-2 border-slate-100 flex items-center justify-center text-xs font-black text-slate-400 group-hover:border-blue-600 group-hover:text-blue-600 group-hover:bg-white mr-6 transition-all shadow-sm">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-slate-800 text-lg font-bold group-hover:text-slate-950 transition-colors">{option[lang]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 px-16 py-8 border-t border-slate-100 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
          <span>{t.complexityLabel}: {currentQuestion?.difficulty}/10</span>
          <span className="text-blue-500">SACA ADAPTIVE ENGINE V4.0</span>
        </div>
      </div>
    </div>
  );
};

export default TestEngine;
