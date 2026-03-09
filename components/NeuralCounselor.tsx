
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getAiraResponse } from '../geminiService';
import { UserProfile, TestResult } from '../types';
import { Language } from '../translations';

interface AiraProps {
  user: UserProfile;
  latestResult: TestResult | null;
  lang: Language;
  activePage: string;
}

const SUGGESTIONS = [
  { en: "How can I improve?", hi: "मैं कैसे सुधार सकता हूँ?", kn: "ನಾನು ಹೇಗೆ ಸುಧಾರಿಸಬಹುದು?" },
  { en: "Explain my score", hi: "मेरा स्कोर समझाएं", kn: "ನನ್ನ ಸ್ಕೋರ್ ವಿವರಿಸಿ" },
  { en: "What is SACA?", hi: "SACA क्या है?", kn: "SACA ಎಂದರೇನು?" }
];

const Aira: React.FC<AiraProps> = ({ user, latestResult, lang, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; timestamp: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialGreeting = useMemo(() => {
    return lang === 'hi' 
      ? `नमस्ते ${user.name}! मैं आयरा हूँ। आपकी प्रगति देखने के लिए मैं उत्साहित हूँ। आप क्या जानना चाहते हैं?` 
      : lang === 'kn' 
      ? `ನಮಸ್ಕಾರ ${user.name}! ನಾನು ಐರಾ. ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ನೋಡಲು ನಾನು ಉತ್ಸುಕನಾಗಿದ್ದೇನೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?` 
      : `Hi ${user.name}! I'm Aira. I've looked at your brain scores and I'm ready to help you grow. What would you like to know?`;
  }, [lang, user.name]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        role: 'ai', 
        text: initialGreeting, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }
  }, [initialGreeting, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleReset = () => {
    setMessages([{ 
      role: 'ai', 
      text: initialGreeting, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setQuery('');
  };

  const userContextString = useMemo(() => {
    const contextObj = {
      Name: user.name || 'Anonymous',
      Age: user.ageGroup,
      LatestIQ: latestResult?.iqScore || 'None yet',
      TopDomain: latestResult ? Object.entries(latestResult.domainScores).sort(([,a],[,b]) => b-a)[0][0] : 'N/A',
      CurrentPage: activePage
    };
    return JSON.stringify(contextObj);
  }, [user, latestResult, activePage]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || query;
    if (!textToSend.trim() || isThinking) return;

    setQuery('');
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', text: textToSend, timestamp }]);
    setIsThinking(true);

    try {
      const response = await getAiraResponse(textToSend, userContextString, lang);
      setMessages(prev => [...prev, { role: 'ai', text: response || "I'm not sure, could you rephrase that?", timestamp }]);
    } catch (err) {
      console.error("Aira error:", err);
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I had a quick glitch. Could you ask me again?", timestamp }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[140] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`
        fixed z-[150] transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] flex flex-col bg-white shadow-2xl overflow-hidden
        bottom-0 right-0 w-full md:w-[450px] h-[85vh] md:h-screen md:top-0
        ${isOpen ? 'translate-x-0 translate-y-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'}
      `}>
        <div className="bg-slate-950 px-8 py-6 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl italic shadow-lg">A</div>
            <div>
              <h4 className="font-bold text-lg leading-tight">Aira</h4>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Growth Mentor</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-all text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-8 bg-white scroll-smooth custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-institutional`}>
              <div className={`max-w-[85%] p-6 rounded-3xl text-[15px] leading-relaxed shadow-sm border ${
                msg.role === 'user' 
                  ? 'bg-slate-950 text-white rounded-br-none border-slate-900' 
                  : 'bg-slate-50 text-slate-900 rounded-bl-none border-slate-100 font-serif italic text-lg'
              }`}>
                {msg.text}
              </div>
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-2 px-1">
                {msg.role === 'ai' ? 'AIRA' : 'YOU'} • {msg.timestamp}
              </span>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-150"></div>
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce delay-300"></div>
            </div>
          )}
        </div>

        <div className="p-8 bg-white border-t border-slate-100 shrink-0">
          <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s[lang as keyof typeof s])}
                className="whitespace-nowrap px-5 py-2.5 bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-[10px] font-black text-slate-500 rounded-xl transition-all shadow-sm active:scale-95"
              >
                {s[lang as keyof typeof s]}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none transition-all pr-14 text-sm font-medium focus:bg-white focus:border-blue-500 shadow-inner"
            />
            <button 
              onClick={() => handleSend()} 
              disabled={!query.trim() || isThinking}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all disabled:opacity-20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </button>
          </div>
        </div>
      </aside>

      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[130] transition-all duration-700 hover-scale active-scale flex items-center gap-4 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <div className="bg-slate-950 px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 ring-8 ring-slate-950/5">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black text-white uppercase tracking-widest">Ask Aira</span>
           <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black italic">A</div>
        </div>
      </button>
    </>
  );
};

export default Aira;
