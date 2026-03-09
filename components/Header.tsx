
import React from 'react';
// Fixed: Imported translations and Language from the correct file (translations.ts)
import { AgeGroup, TestMode, UserProfile } from '../types';
import { translations, Language } from '../translations';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  lang: Language;
  setLang: (lang: Language) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, lang, setLang, user, onLogout }) => {
  // @ts-ignore
  const t = translations[lang];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-slate-950 rounded-[12px] flex items-center justify-center mr-4 shadow-sm transition-all group-hover:bg-blue-600">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-950 tracking-tighter uppercase leading-none">SACA</span>
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none mt-1">Registry</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-10">
            {[
              { id: 'methodology', label: t.protocol },
              { id: 'training', label: t.training },
              { id: 'founder', label: t.founder },
              { id: 'about', label: t.about }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all relative py-2 ${
                  currentPage === item.id 
                    ? 'text-blue-600' 
                    : 'text-slate-400 hover:text-slate-950'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 mr-2">
              {(['en', 'hi', 'kn'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    lang === l ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {user ? (
              <div className="flex items-center gap-5 pl-4 border-l border-slate-100">
                 <div className="text-right hidden sm:block">
                   <p className="text-[10px] font-black text-slate-950 uppercase leading-none mb-1">{user.name}</p>
                   <p className="text-[8px] font-bold text-blue-600 uppercase tracking-widest leading-none">Verified Subject</p>
                 </div>
                 <button 
                  onClick={() => onNavigate('dashboard')}
                  className="w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center group overflow-hidden"
                 >
                    <div className="w-full h-full bg-slate-950 text-white font-black text-xs flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      {user.name.charAt(0)}
                    </div>
                 </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="bg-slate-950 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
