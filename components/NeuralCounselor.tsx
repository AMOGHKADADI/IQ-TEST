
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getAiraResponse } from '../geminiService';
import { UserProfile, TestResult } from '../types';
import { Language } from '../translations';

interface AiraProps {
  user: UserProfile;
  latestResult: TestResult | null;
  lang: Language;
}

const Aira: React.FC<AiraProps> = ({ user, latestResult, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialGreeting = useMemo(() => {
    return lang === 'hi' 
      ? 'सत्यापित अभिलेखागार में आपका स्वागत है। मैं आयरा (Aira) हूँ। मैं आपकी संज्ञानात्मक प्रोफ़ाइल में क्या सहायता कर सकती हूँ?' 
      : lang === 'kn' 
      ? 'ದೃಢೀಕೃತ ಆರ್ಕೈವ್‌ಗಳಿಗೆ ಸ್ವಾಗತ. ನಾನು ಐರಾ (Aira). ಇಂದು ನಿಮ್ಮ ಅರಿವಿನ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?' 
      : 'Welcome to the SACA Archives. I am Aira, your Institutional Analyst. How may I assist with your cognitive roadmap today?';
  }, [lang]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'ai', text: initialGreeting }]);
    }
  }, [initialGreeting]);

  const handleReset = () => {
    setMessages([{ role: 'ai', text: initialGreeting }]);
    setQuery('');
  };

  const userContextString = useMemo(() => {
    let context = `Name: ${user.name || 'Anonymous'}\nAge: ${user.ageGroup}\n`;
    if (latestResult) {
      context += `Latest IQ: ${latestResult.iqScore}\nDomain Strengths: ${JSON.stringify(latestResult.domainScores)}\nTagline: ${latestResult.uniqueTagline}\n`;
    }
    return context;
  }, [user, latestResult]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!query.trim() || isThinking) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);

    try {
      const response = await getAiraResponse(userMsg, userContextString, lang);
      setMessages(prev => [...prev, { role: 'ai', text: response || "I'm having trouble connecting to the neural core." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Neural link interrupted. Please verify connection." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] no-print">
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-3xl w-[420px] h-[650px] rounded-[50px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-white ring-1 ring-slate-950/5 animate-institutional">
          {/* Enhanced Header */}
          <div className="bg-slate-950 p-8 text-white flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="font-black text-xl">A</span>
              </div>
              <div className="leading-tight">
                <h4 className="font-bold text-sm tracking-tight">Aira Analyst</h4>
                <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest mt-1">SACA Core v5.2</p>
              </div>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <button 
                onClick={handleReset}
                title="Reset Session"
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-all text-slate-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              </button>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>

          {/* Chat area */}
          <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-8 scroll-smooth bg-gradient-to-b from-transparent to-slate-50/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-6 rounded-[35px] text-[13px] leading-relaxed shadow-sm transition-all ${
                  msg.role === 'user' 
                    ? 'bg-slate-950 text-white rounded-br-none' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none ring-1 ring-slate-900/5'
                }`}>
                  <div className="prose prose-sm whitespace-pre-wrap">{msg.text}</div>
                  {msg.role === 'ai' && i > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                       <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                       <span className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Aira Institutional Output</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-5 rounded-[30px] rounded-bl-none flex items-center gap-2 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="p-8 bg-white border-t border-slate-100">
            <div className="relative group">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Inquire about your neural roadmap..."
                className="w-full bg-slate-50 border border-slate-100 rounded-[28px] px-8 py-5 outline-none transition-all pr-14 text-sm font-medium focus:ring-4 focus:ring-blue-600/5 focus:bg-white focus:border-blue-200"
              />
              <button 
                onClick={handleSend} 
                disabled={!query.trim() || isThinking}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all active:scale-90 disabled:opacity-30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </button>
            </div>
            <p className="text-center text-[8px] text-slate-300 font-black uppercase tracking-[0.2em] mt-4">Verified Communication Gateway</p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-slate-950 text-white rounded-[32px] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border border-white/10"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-[32px] opacity-0 group-hover:opacity-30 blur-2xl transition-all"></div>
          <span className="relative font-black text-2xl tracking-tighter">A</span>
        </button>
      )}
    </div>
  );
};

export default Aira;
