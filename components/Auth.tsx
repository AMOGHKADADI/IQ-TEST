
import React, { useState } from 'react';
import { UserProfile, AgeGroup, TestMode } from '../types';
import { Language } from '../translations';

interface AuthProps {
  onSuccess: (user: UserProfile) => void;
  lang: Language;
}

const Auth: React.FC<AuthProps> = ({ onSuccess, lang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const registry = JSON.parse(localStorage.getItem('SACA_REGISTRY') || '{}');
    const emailKey = email.toLowerCase();

    if (isLogin) {
      const user = registry[emailKey];
      if (user && user.password === password) {
        onSuccess(user);
      } else {
        setError('Invalid institutional credentials.');
      }
    } else {
      if (registry[emailKey]) {
        setError('Identity already exists in registry.');
        return;
      }
      const newUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 11).toUpperCase(),
        name,
        email: emailKey,
        password,
        ageGroup: AgeGroup.ADULT,
        testMode: TestMode.SERIOUS,
        isPremium: true,
        history: [],
        streak: 0
      };
      registry[emailKey] = newUser;
      localStorage.setItem('SACA_REGISTRY', JSON.stringify(registry));
      onSuccess(newUser);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-24 px-6 animate-institutional">
      <div className="bg-white p-16 rounded-[60px] border border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full -mr-20 -mt-20"></div>
        
        <div className="text-center mb-12 relative z-10">
          <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
             <span className="text-white font-black text-2xl">S</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-950 tracking-tighter font-serif italic mb-3">
            {isLogin ? 'Subject Login' : 'Register Identity'}
          </h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">SACA Institutional Registry</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-8 relative z-10">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest text-center rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Legal Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all font-bold text-slate-800"
                placeholder="Amogh Kadadi"
              />
            </div>
          )}

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Institutional Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all font-bold text-slate-800"
              placeholder="id@saca.edu.in"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Secure Passkey</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all font-bold text-slate-800"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-950 text-white py-7 rounded-[30px] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-blue-600 transition-all active:scale-95"
          >
            {isLogin ? 'Authenticate Session' : 'Create Registry Entry'}
          </button>
        </form>

        <div className="mt-12 text-center relative z-10">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
          >
            {isLogin ? "No registry entry? Create one now" : "Already registered? Login here"}
          </button>
        </div>
      </div>
      
      <p className="mt-12 text-center text-[9px] text-slate-300 font-black uppercase tracking-[0.5em] leading-relaxed">
        SECURE GATEWAY V5.28 • ENCRYPTED DATA TRANSFER • SACA PROTOCOL
      </p>
    </div>
  );
};

export default Auth;
